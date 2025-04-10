"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./NavBar.css";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

const NavBar = ({ setShowLogin }) => {
  const { isLoggedIn, logout, username } = useAuth();
  const { totalQuantity, clearCart } = useCart();
  const router = useRouter();

  const handleCartClick = () => {
    router.push("/Cart");
  };

  const handleLogout = () => {
    clearCart();
    logout();
  };
  
  const handleProfileClick = () => {
    if (isLoggedIn){
      router.push("/profileCreation");
    }else{
      setShowLogin(true);
    }
  };

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
          <button onClick={handleProfileClick} className="nav-button">
            Profile
          </button>
        </li>
        <li>
          <Link href="/Contact">Contact</Link>
        </li>
      </ul>

      {/* Login/Logout Buttons */}
      <div className="icons">
        <button className="cart-btn" onClick={handleCartClick}>
          <Image src="/cart-icon.png" alt="Cart" width={22} height={22} />
          {totalQuantity > 0 && (
            <span className="cart-count">{totalQuantity}</span>
          )}
        </button>

        {isLoggedIn ? (
          <div className="user-info">
            <span className="welcome-text">Welcome, {username}!</span>
            <button className="modern-btn logout-btn" onClick={handleLogout}>
              <span className="btn-text">Logout</span>
            </button>
          </div>
        ) : (
          <button className="modern-btn login-btn" onClick={() => setShowLogin(true)}>
            <span className="btn-text">Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;