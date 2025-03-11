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
  const { totalQuantity } = useCart();
  const router = useRouter();
  const handleCartClick = () => {
    router.push("/Cart"); // Navigate to the Cart page
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
          <Link href="/shop">Shop</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
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
        <button className="cart-btn" onClick={handleCartClick}>
          <Image src="/cart-icon.png" alt="Cart" width={22} height={22} />
          {totalQuantity > 0 && (
            <span className="cart-count">{totalQuantity}</span>
          )}
        </button>

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
