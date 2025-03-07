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
    login(username: $username, password: $password)
  }
`;

const GRAPHQL_ENDPOINT = "http://127.0.0.1:8000/auth_app/graphql/";

const LandingPage = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const categoriesRef = useRef(null);

  const scrollLeft = () => {
    categoriesRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    categoriesRef.current?.scrollBy({ left: 300, behavior: "smooth" });
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
          <li><Link href="./Contact">Contact</Link></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button className="search-button">
            <Image src="/maginifying.png" alt="Search" width={18} height={18} />
          </button>
        </div>
        <div className="icons">
          <button className="login-btn" onClick={() => setLoginModalOpen(true)}>
            <Image src="/login-img.png" alt="Login" width={22} height={22} />
          </button>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} closeModal={() => setLoginModalOpen(false)} onLoginSuccess={login} />

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

      {/* Popular Products */}
      <section className="popular-categories">
        <h3 className="section-title">Popular Products</h3>
        <div className="categories-wrapper">
          <div className="category-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="category-item">
                <Image src={`/gallery_${index + 1}.jpg`} alt={`Category ${index + 1}`} width={300} height={350} className="category-img" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-logo-container">
              <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
              <span className="footer-logo">LUXORA</span>
            </div>
            <p className="footer-address">Address of the Company<br />P.O. Box</p>
          </div>
          <ul className="footer-links">
            <li><Link href="#">Home</Link></li>
            <li><Link href="./Shop">Shop</Link></li>
            <li><Link href="./Contact">Contact</Link></li>
          </ul>
          <div className="footer-right">
            <Link href="#"><Image src="/phone.png" alt="Phone" width={30} height={22} /></Link>
            <Link href="https://x.com/luxora_inc?lang=en"><Image src="/X.png" alt="X" width={22} height={22} /></Link>
            <Link href="https://www.instagram.com/luxoraofficial/?hl=en"><Image src="/instagram.png" alt="Instagram" width={22} height={22} /></Link>
          </div>
        </div>
        <div className="privacy-policy">
          <Link href="#">Privacy & Policy</Link>
        </div>
        <hr className="footer-divider" />
        <p className="footer-bottom-text">All rights reserved</p>
      </footer>
    </div>
  );
};

export default LandingPage;
