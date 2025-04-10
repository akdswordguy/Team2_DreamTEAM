"use client";
import React, { useState, useEffect } from "react";
import Profile from "./profile";
import { usePathname, useRouter } from "next/navigation";
import "react-image-crop/dist/ReactCrop.css";
import "./profileCreation.css";
import { useAuth } from "../context/AuthContext";

const CreateProfile = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [activeSection, setActiveSection] = useState("Profile");
  const [selectedImage, setSelectedImage] = useState(null);
  const { username, email, isLoggedIn, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const orderList = [
    { id: 1, product: "Laptop", price: 999.99, date: "2025-03-01" },
    { id: 2, product: "Headphones", price: 49.99, date: "2025-03-15" },
    { id: 3, product: "Mouse", price: 29.99, date: "2025-03-20" },
  ];

  useEffect(() => {
    console.log("ProfilePage - User Data:", { username, email, isLoggedIn });
  }, [username, email, isLoggedIn]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("lastVisitedPage", pathname);
    }
  }, [pathname]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleImageChange = (imgSrc) => {
    setSelectedImage(imgSrc);
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
  };

  const handleSaveChanges = () => {
    if (selectedImage) {
      console.log("Uploading image:", selectedImage);
    }
    alert("Profile updated successfully!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion request submitted!");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="sidebar">
        <h2 className="sidebar-title">Settings</h2>
        <ul className="sidebar-nav">
          <li
            className={`sidebar-item ${activeSection === "Profile" ? "active" : ""}`}
            onClick={() => handleSectionChange("Profile")}
          >
            <span className="sidebar-icon">👤</span> Profile
          </li>
          <li
            className={`sidebar-item ${activeSection === "Address" ? "active" : ""}`}
            onClick={() => handleSectionChange("Address")}
          >
            <span className="sidebar-icon">🏠</span> Address
          </li>
          <li
            className={`sidebar-item ${activeSection === "OrderList" ? "active" : ""}`}
            onClick={() => handleSectionChange("OrderList")}
          >
            <span className="sidebar-icon">📦</span> Order List
          </li>
          <li
            className={`sidebar-item ${activeSection === "DeleteAccount" ? "active" : ""}`}
            onClick={() => handleSectionChange("DeleteAccount")}
          >
            <span className="sidebar-icon">🗑️</span> Delete Account
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="left-section">
          {activeSection === "Profile" && (
            <>
              <div className="signup-container">
                <h2 className="section-title">Profile</h2>
                <div className="banner-video">
                  <video className="luxora-video" autoPlay loop muted playsInline>
                    <source src="/animation.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="form-container">
                  <div className="profile-upload">
                    <Profile onImageChange={handleImageChange} onDelete={handleImageDelete} />
                    <div className="profile-picture-buttons">
                      <button className="change-picture-button">Change picture</button>
                      <button className="delete-picture-button" onClick={handleImageDelete}>
                        Delete picture
                      </button>
                    </div>
                  </div>

                  <div className="form-fields">
                    <div className="input-group">
                      <label htmlFor="profileName">Profile Name</label>
                      <input type="text" id="profileName" defaultValue="Kevin Heart" readOnly />
                    </div>
                    <div className="input-group">
                      <label htmlFor="username">Username</label>
                      <input type="text" id="username" value={`@${username}`} readOnly />
                      <p className="field-note">Available change in 25/04/2024</p>
                    </div>
                    <div className="input-group">
                      <label htmlFor="status">Status</label>
                      <select id="status" defaultValue="On duty">
                        <option value="On duty">On duty</option>
                        <option value="Off duty">Off duty</option>
                        <option value="Busy">Busy</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label htmlFor="aboutMe">About Me</label>
                      <textarea
                        id="aboutMe"
                        defaultValue="Discuss only work hour, unless you wanna discuss about music 👍"
                        rows="3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="signup-container">
                <h2 className="section-title">Personal Information</h2>
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
                </div>
              </div>
            </>
          )}

          {activeSection === "Address" && (
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
            </div>
          )}

          {activeSection === "OrderList" && (
            <div className="signup-container">
              <h2 className="section-title">Order List</h2>
              <div className="order-list">
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderList.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.product}</td>
                        <td>${order.price.toFixed(2)}</td>
                        <td>{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "DeleteAccount" && (
            <div className="signup-container">
              <h2 className="section-title">Delete Account</h2>
              <div className="delete-account-section">
                <p className="delete-warning">
                  Warning: Deleting your account is permanent and cannot be undone. All your data will be lost.
                </p>
                <button className="delete-account-button" onClick={handleDeleteAccount}>
                  Delete My Account
                </button>
              </div>
            </div>
          )}

          <div className="button-group">
            <button className="update-profile-button" onClick={handleSaveChanges}>
              Update Profile
            </button>
            <button 
              className="logout-button" 
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;