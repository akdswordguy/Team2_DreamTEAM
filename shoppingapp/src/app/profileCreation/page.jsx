"use client";
import React, { useState,useContext, useEffect} from "react";
import Profile from "./profile";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "react-image-crop/dist/ReactCrop.css";
import "./profileCreation.css";
import AuthContext from "../AuthContext"; 

const CreateProfile = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const pathname = usePathname();
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const lastVisited = sessionStorage.getItem("lastVisitedPage");
        const hasReloaded = sessionStorage.getItem("hasReloaded");
    
        if (lastVisited === pathname && hasReloaded !== "true") {
          sessionStorage.setItem("hasReloaded", "true");
          window.location.reload();
        } else {
          sessionStorage.setItem("hasReloaded", "false");
        }
    
        sessionStorage.setItem("lastVisitedPage", pathname);
      }
    }, [pathname]);


  return (
    <div className="signup">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
          <div className="logo">LUXORA</div>
        </div>
        <ul className="nav-links">
          <li><Link href="./">Home</Link></li>
          <li><Link href="./profileCreation">Profile</Link></li>
          <li><Link href="./Contact">Contact</Link></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button className="search-button">
            <Image src="/maginifying.png" alt="Search" width={18} height={18} />
          </button>
        </div>
        <div className="icons">
          <button className="login-btn" onClick={() => setShowLogin(true)}>
            <Image src="/login-img.png" alt="Login" width={22} height={22} />
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="main-content">
        {/* Left Content - Form and Profile Upload */}
        <div className="left-section">
          {/* Signup Section */}
          <div className="signup-container">
            <h2 className="section-title">Personal Information</h2>
            <div className="form-container">
              {/* Profile Upload Section - Positioned on Left */}
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
                  <input type="email" id="email" placeholder="example@mail.com" />
                </div>
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" placeholder="Username" />
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
                }} >Log Out</button> 
              
            </div>
          </div>
        </div>

        {/* Right Content - Video Placeholder */}
            <div className="right-section">
    <video className="video-content" autoPlay loop muted playsInline>
        <source src="./animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    </div>

        </div>
      </div>
  );
};

export default CreateProfile;
