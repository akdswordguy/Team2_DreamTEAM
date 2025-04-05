'use client';

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GraphQLClient, gql } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import "react-image-crop/dist/ReactCrop.css";
import "./profileCreation.css";
import { useAuth } from "../context/AuthContext";
import Profile from "./profile";

const endpoint = "http://localhost:8000/auth_app/graphql/";

// Dynamic GraphQL client getter with token
const getClient = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = token ? { Authorization: `JWT ${token}` } : {};
  return new GraphQLClient(endpoint, {
    headers,
    credentials: "include",
  });
};

const GET_PROFILE = gql`
  query {
    myProfile {
      firstName
      lastName
      phone
      street
      city
      landmark
      state
      country
      postalCode
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      success
      message
    }
  }
`;

const CreateProfile = () => {
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    city: '',
    landmark: '',
    state: '',
    country: '',
    postalCode: '',
  });
  const [message, setMessage] = useState('');

  const { username, email, isLoggedIn, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        alert("You need to be logged in to access this page!");
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("lastVisitedPage", pathname);
    }
  }, [pathname]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const client = getClient();
        const data = await client.request(GET_PROFILE);
        const profile = data.myProfile;
        if (profile) {
          setProfileForm({
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            phone: profile.phone || '',
            street: profile.street || '',
            city: profile.city || '',
            landmark: profile.landmark || '',
            state: profile.state || '',
            country: profile.country || '',
            postalCode: profile.postalCode || '',
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("Unable to fetch profile. Please log in again or try later.");
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const client = getClient();
      const variables = { input: profileForm };
      const response = await client.request(UPDATE_PROFILE, variables);
      setMessage(response.updateProfile.message);
    } catch (err) {
      console.error(err);
      setMessage("Profile update failed.");
    }
  };

  return (
    <div className="signup">
      <div className="main-content">
        <div className="left-section">
          {/* Personal Information */}
          <div className="signup-container">
            <h2 className="section-title">Personal Information</h2>
            <div className="form-container">
              <div className="profile-upload">
                <Profile />
              </div>

              {/* Personal Form */}
              <form onSubmit={handleSubmit} className="form-fields">
                <div className="input-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={profileForm.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={profileForm.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    value={profileForm.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Mail ID</label>
                  <input type="email" id="email" defaultValue={email} readOnly />
                </div>
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" defaultValue={username} readOnly />
                </div>
              </form>
            </div>
          </div>

          {/* Location Information */}
          <div className="signup-container">
            <h2 className="section-title">Location Information</h2>
            <form onSubmit={handleSubmit} className="form-fields">
              <div className="input-group">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  id="street"
                  value={profileForm.street}
                  onChange={handleChange}
                  placeholder="Street"
                />
              </div>
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={profileForm.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
              <div className="input-group">
                <label htmlFor="landmark">Landmark</label>
                <input
                  type="text"
                  id="landmark"
                  value={profileForm.landmark}
                  onChange={handleChange}
                  placeholder="Landmark"
                />
              </div>
              <div className="input-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  value={profileForm.state}
                  onChange={handleChange}
                  placeholder="State"
                />
              </div>
              <div className="input-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  value={profileForm.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
              </div>
              <div className="input-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="number"
                  id="postalCode"
                  value={profileForm.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                />
              </div>

              <div className="button-group">
                <button type="submit" className="update-profile-button">
                  Update Profile
                </button>
                <button
                  type="button"
                  className="logout-button"
                  onClick={() => {
                    logout();
                    alert("You have been logged out successfully!");
                  }}
                >
                  Log Out
                </button>
              </div>
              {message && <p className="status-message">{message}</p>}
            </form>
          </div>
        </div>

        {/* Right Video Section */}
        <div className="right-section">
          <video className="video-content" autoPlay loop muted playsInline>
            <source src="/animation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
