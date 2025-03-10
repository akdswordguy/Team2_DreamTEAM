"use client";

import React, { useState, useRef, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { request, gql } from "graphql-request";
import AuthContext from "./AuthContext";
import LoginModal from "./components/LoginModal";
import CategoryList from "./components/CategoryList";
import "./LandingPage.css";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      username
      token
      errors
    }
  }
`;

const GRAPHQL_ENDPOINT = "http://127.0.0.1:8000/auth_app/graphql/";

const LandingPage = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const categoriesRef = useRef(null);

  // ✅ Fix: Ensure username & password are passed correctly
  const handleLogin = async (username, password) => {
    if (!username || !password) {
      alert("Username and password are required.");
      return;
    }

    try {
      console.log("Attempting login with:", { username, password });

      // ✅ Pass variables correctly
      const variables = { username, password };
      const data = await request(GRAPHQL_ENDPOINT, LOGIN_MUTATION, variables);

      console.log("Login response:", data);

      const loginResult = data?.login;

      if (loginResult?.success && loginResult?.token) {
        console.log("Login successful!");

        // ✅ Use the AuthContext login function to store session
        login(loginResult.username, loginResult.token);

        // ✅ Close login modal on success
        setLoginModalOpen(false);
      } else {
        alert(loginResult?.errors || "Login failed!");
      }
    } catch (error) {
      console.error("GraphQL Login Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const scrollLeft = () => categoriesRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => categoriesRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
          <div className="logo">LUXORA</div>
        </div>
        <ul className="nav-links">
          <li><Link href="#">Home</Link></li>
          <li><Link href="./Shop">Shop</Link></li>
          <li><Link href="./Contact">Contact</Link></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button className="search-button">
            <Image src="/magnifying.png" alt="Search" width={18} height={18} />
          </button>
        </div>
        <div className="icons">
          {isAuthenticated ? (
            <button className="login-btn" onClick={() => alert("Already logged in!")}>
              <Image src="/user-icon.png" alt="User" width={22} height={22} />
            </button>
          ) : (
            <button className="login-btn" onClick={() => setLoginModalOpen(true)}>
              <Image src="/login-img.png" alt="Login" width={22} height={22} />
            </button>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} closeModal={() => setLoginModalOpen(false)} onLoginSuccess={handleLogin} />

      {/* Hero Section */}
      <section className="hero">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/landing-vid.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content-container">
          <div className="hero-content">
            <p><b>Latest in Trends</b></p>
            <h2>Discover Our <span>Wide Collection</span></h2>
            <p>Bringing you the finest luxury products to match your perfect style.</p>
            <Link href="./Shop"><button className="btn">Shop Now</button></Link>
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="categories">
        <h3 className="section-title">Browse Categories</h3>
        <CategoryList />
      </section>
    </div>
  );
};

export default LandingPage;
