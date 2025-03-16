"use client";

import React, { useState, useRef, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { request, gql } from "graphql-request";
// import AuthContext from "./AuthContext_old";
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
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const categoriesRef = useRef(null);
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

  const scrollLeft = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/landing-vid.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content-container">
          <div className="hero-content">
            <p>
              <b>Latest in Trends</b>
            </p>
            <h2>
              Discover Our <span>Wide Collection</span>
            </h2>
            <p>
              Bringing you the finest luxury products to match your perfect
              style.
            </p>
            <Link href="./category/24">
              <button className="btn">Shop Now</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="categories">
        <CategoryList />
      </section>

      {/* Popular Products */}
      <section className="popular-categories">
        <h3 className="section-title" data-testid ="cypress-title">Popular Products</h3>
        <div className="categories-wrapper">
          <div className="category-grid">
            <div className="category-item large offset-up">
              <Image
                src="/gallery_1.jpg"
                alt="Category 1"
                width={300}
                height={350}
                className="category-img"
              />
            </div>
            <div className="category-item medium offset-down">
              <Image
                src="/gallery_2.jpg"
                alt="Category 2"
                width={220}
                height={250}
                className="category-img"
              />
            </div>
            <div className="category-item small">
              <Image
                src="/gallery_3.jpg"
                alt="Category 3"
                width={180}
                height={200}
                className="category-img"
              />
            </div>
            <div className="category-item large">
              <Image
                src="/gallery_4.jpg"
                alt="Category 4"
                width={300}
                height={400}
                className="category-img"
              />
            </div>
            <div className="category-item medium offset-up">
              <Image
                src="/gallery_5.jpeg"
                alt="Category 5"
                width={220}
                height={270}
                className="category-img"
              />
            </div>
            <div className="category-item small offset-down">
              <Image
                src="/gallery_7.jpg"
                alt="Category 6"
                width={180}
                height={220}
                className="category-img"
              />
            </div>
            <div className="category-item large">
              <Image
                src="/gallery_8.jpg"
                alt="Category 7"
                width={300}
                height={380}
                className="category-img"
              />
            </div>
            <div className="category-item medium offset-up">
              <Image
                src="/gallery_8.jpg"
                alt="Category 8"
                width={180}
                height={220}
                className="category-img"
              />
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
              <Image
                src="/company-logo.png"
                alt="Company Logo"
                width={35}
                height={35}
              />
              <span className="footer-logo">LUXORA</span>
            </div>
            <p className="footer-address">
              Address of the Company
              <br />
              P.O. Box
            </p>
          </div>

          {/* Center Section - Navigation Links */}
          <ul className="footer-links">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="./profileCreation">Profile</Link>
            </li>
            <li>
              <Link href="./Contact">Contact</Link>
            </li>
          </ul>

          {/* Right Section - Social Icons */}
          <div className="footer-right">
            <Link href="#">
              <Image src="/phone.png" alt="Phone" width={30} height={22} />
            </Link>
            <Link href="https://x.com/luxora_inc?lang=en">
              <Image src="/X.png" alt="X" width={22} height={22} />
            </Link>
            <Link href="https://www.instagram.com/luxoraofficial/?hl=en">
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={22}
                height={22}
              />
            </Link>
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
