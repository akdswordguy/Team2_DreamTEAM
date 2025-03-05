'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { request, gql } from "graphql-request";
import "./LandingPage.css";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const GRAPHQL_ENDPOINT = "http://127.0.0.1:8000/auth_app/graphql/"; 

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await request(GRAPHQL_ENDPOINT, LOGIN_MUTATION, credentials);
      if (response.login) {
        alert("Login successful!");
        setShowLogin(false);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
    setLoading(false);
  };


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
          <li><Link href="./Product">About</Link></li>
          <li><Link href="#">Contact</Link></li>
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

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="login-input"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button className="btn login-submit" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="error-text">{error}</p>}
            <p className="signup-text">Don't have an account? <Link href="./Signup">Sign up</Link></p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content-container">
          <div className="hero-content">
            <p><b>Latest in Trends</b></p>
            <h2>Discover Our <span>Wide Collection</span></h2>
            <p>Bringing you the finest luxury products to match your perfect style.
            From budget friendly to top of the line.</p>
            <button className="btn">Shop Now</button>
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="categories">
        <h3 className="section-title">Browse Categories</h3>
        <div className="categories-container">
          <div className="category-card">
            <Image src="/technology.jpeg" alt="Technology" width={280} height={180} className="category-img" />
            <p>Technology</p>
          </div>
          <div className="category-card">
            <Image src="/furniture.jpg" alt="Decor" width={280} height={180} className="category-img" />
            <p>Decor</p>
          </div>
          <div className="category-card">
            <Image src="/fashion.jpg" alt="Fashion" width={280} height={180} className="category-img" />
            <p>Fashion</p>
          </div>
        </div>
      </section>



      {/* Popular Products */}
<section className="popular-categories">
  <h3 className="section-title">Popular Products</h3>
  <div className="categories-wrapper">
    <div className="category-grid">
      <div className="category-item large offset-up">
        <Image src="/gallery_1.jpg" alt="Category 1" width={300} height={350} className="category-img" />
      </div>
      <div className="category-item medium offset-down">
        <Image src="/gallery_2.jpg" alt="Category 2" width={220} height={250} className="category-img" />
      </div>
      <div className="category-item small">
        <Image src="/gallery_3.jpg" alt="Category 3" width={180} height={200} className="category-img" />
      </div>
      <div className="category-item large">
        <Image src="/gallery_4.jpg" alt="Category 4" width={300} height={400} className="category-img" />
      </div>
      <div className="category-item medium offset-up">
        <Image src="/gallery_5.jpeg" alt="Category 5" width={220} height={270} className="category-img" />
      </div>
      <div className="category-item small offset-down">
        <Image src="/gallery_7.jpg" alt="Category 6" width={180} height={220} className="category-img" />
      </div>
      <div className="category-item large">
        <Image src="/gallery_8.jpg" alt="Category 7" width={300} height={380} className="category-img" />
      </div>
      <div className="category-item medium offset-up">
        <Image src="/gallery_8.jpg" alt="Category 8" width={180} height={220} className="category-img" />
      </div>
    </div>
  </div>

  {/* Scroll Right Arrow */}
  <button className="scroll-arrow">→</button>
</section>


      {/* Footer */}
<footer className="footer">
  <div className="footer-container">
    {/* Left Section - Logo & Address */}
    <div className="footer-left">
      <div className="footer-logo-container">
        <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
        <span className="footer-logo">LUXORA</span>
      </div>
      <p className="footer-address">Address of the Company<br />P.O. Box</p>
    </div>

    {/* Center Section - Navigation Links */}
    <ul className="footer-links">
      <li><Link href="#">Home</Link></li>
      <li><Link href="#">Shop</Link></li>
      <li><Link href="#">About</Link></li>
      <li><Link href="#">Contact</Link></li>
    </ul>

    {/* Right Section - Social Icons */}
    <div className="footer-right">
      <Link href="#"><Image src="/phone.png" alt="Phone" width={30} height={22} /></Link>
      <Link href="#"><Image src="/X.png" alt="X" width={22} height={22} /></Link>
      <Link href="#"><Image src="/instagram.png" alt="Instagram" width={22} height={22} /></Link>
    </div>
  </div>

  {/* Privacy & Policy Link */}
  <div className="privacy-policy">
    <Link href="#">Privacy & Policy</Link>
  </div>

  {/* Divider */}
  <hr className="footer-divider" />

  {/* Bottom Section - Copyright */}
  <p className="footer-bottom-text">All rights reserved</p>
</footer>

    </div>
  );
};

export default LandingPage;
