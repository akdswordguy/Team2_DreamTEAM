"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./NavBar.css";
import { useAuth } from "../AuthContext";

const NavBar = ({ setShowLogin }) => {
  const { isLoggedIn, logout, username } = useAuth();

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo-container">
        <Image
          src="/company-logo.png"
          alt="Company Logo"
          width={35}
          height={35}
        />
        <div className="logo">LUXORA</div>
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/Shop">Shop</Link>
        </li>
        <li>
          <Link href="/Contact">Contact</Link>
        </li>
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button className="search-button">
          <Image src="/maginifying.png" alt="Search" width={18} height={18} />
        </button>
      </div>

      {/* Login/Logout Buttons */}
      <div className="icons">
        {isLoggedIn ? (
          <div className="user-info">
            <span className="welcome-text">Welcome, {username}!</span>{" "}
            {/* Display Username */}
            <button className="logout-btn" onClick={logout}>
              <Image
                src="/logout-img.png"
                alt="Logout"
                width={22}
                height={22}
              />
            </button>
          </div>
        ) : (
          <button className="login-btn" onClick={() => setShowLogin(true)}>
            <Image src="/login-img.png" alt="Login" width={22} height={22} />
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
