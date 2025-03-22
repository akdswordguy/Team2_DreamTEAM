"use client";
import React, { useState, useEffect } from "react";
import Profile from "./profile";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "react-image-crop/dist/ReactCrop.css";
import "./profileCreation.css";
import { useAuth } from "../context/AuthContext";

const CreateProfile = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { username, email, isLoggedIn, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Delay login check by 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        alert("You need to be logged in to access this page!");

      }
    }, 2000);

    return () => clearTimeout(timer); // Cleanup function
  }, [isLoggedIn, router]);

  useEffect(() => {
    console.log("ProfilePage - User Data:", { username, email, isLoggedIn });
  }, [username, email, isLoggedIn]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("lastVisitedPage", pathname);
    }
  }, [pathname]);

  return (
    <div className="signup">
      {/* Main Container */}
      <div className="main-content">
        {/* Left Content - Form and Profile Upload */}
        <div className="left-section">
          {/* Signup Section */}
          <div className="signup-container">
            <h2 className="section-title">Personal Information</h2>
            <div className="form-container">
              {/* Profile Upload Section */}
              <div className="profile-upload">
                <Profile />
              </div>

              {/* Form Fields */}
              <div className="form-fields">
                <div className="input-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" placeholder="First Name" />
                </div>
                <div className="input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" placeholder="Last Name" />
                </div>
                <div className="input-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="text" id="phone" placeholder="Phone" />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Mail ID</label>
                  <input type="email" id="email" defaultValue={email} readOnly />
                </div>
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" defaultValue={username} readOnly />
                </div>
              </div>
            </div>
          </div>

          {/* Location Information Section */}
          <div className="signup-container">
            <h2 className="section-title">Location Information</h2>
            <div className="form-fields">
              <div className="input-group">
                <label htmlFor="street">Street</label>
                <input type="text" id="street" placeholder="Street" />
              </div>
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="City" />
              </div>
              <div className="input-group">
                <label htmlFor="landmark">Landmark</label>
                <input type="text" id="landmark" placeholder="Landmark" />
              </div>
              <div className="input-group">
                <label htmlFor="state">State</label>
                <input type="text" id="state" placeholder="State" />
              </div>
              <div className="input-group">
                <label htmlFor="country">Country</label>
                <input type="text" id="country" placeholder="Country" />
              </div>
              <div className="input-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input type="number" id="postalCode" placeholder="Postal Code" />
              </div>
            </div>

            {/* Buttons: Update Profile & Log Out */}
            <div className="button-group">
              <button className="update-profile-button">Update Profile</button>
              <button className="logout-button" onClick={() => {
                logout();
                alert("You have been logged out successfully!");
              }}>Log Out</button>
            </div>
          </div>
        </div>

        {/* Right Content - Video Placeholder */}
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
