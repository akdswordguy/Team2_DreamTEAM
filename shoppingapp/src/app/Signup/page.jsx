"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gql from "graphql-tag";
import "./styles.css";

// Define GraphQL mutation using graphql-tag
const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!, $name: String!) {
    register(username: $username, email: $email, password: $password, name: $name) {
      message
      success
    }
  }
`;

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth_app/graphql/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: REGISTER_MUTATION.loc.source.body,
          variables: {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            name: formData.name,
          },
        }),
      });

      const result = await response.json();
      if (result.data.register.success) {
        setMessage(result.data.register.message);
      } else {
        setError(result.data.register.message);
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="signup-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
          <div className="logo">LUXORA</div>
        </div>
        <ul className="nav-links">
          <li><Link href="./">Home</Link></li>
          <li><Link href="./Shop">Shop</Link></li>
          <li><Link href="./Contact">Contact</Link></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button className="search-button">
            <Image src="/maginifying.png" alt="Search" width={18} height={18} />
          </button>
        </div>
      </nav>

      {/* Signup Section */}
      <div className="signup-container">
        <div className="signup-image">
          <Image src="/signup-img.png" alt="Signup Illustration" layout="fill" objectFit="cover" />
        </div>

        {/* Right Side Form */}
        <div className="signup-form">
          <h2 className="signup-title">Create Account</h2>

          {/* Social Signup Buttons */}
          <div className="social-buttons">
            <button className="google-signup">
              <Image src="/google.png" alt="Google" width={20} height={20} />
              Signup with Google
            </button>
            <button className="facebook-signup">
              <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
              Signup with Facebook
            </button>
          </div>

          {/* Login Modal */}
          {showLogin && (
            <div className="modal-overlay" onClick={() => setShowLogin(false)}>
              <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Login</h2>
                <input type="text" placeholder="Username or Email" className="login-input" />
                <input type="password" placeholder="Password" className="login-input" />
                <button className="btn login-submit">Login</button>
                <p className="signup-text">
                  Don't have an account? <Link href="./Signup">Sign up</Link>
                </p>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="divider">- OR -</div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="signup-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="signup-input"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="signup-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="signup-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="signup-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Signing up..." : "Create Account"}
            </button>

            {/* Alert Boxes for Success and Error Messages */}
            {error && (
              <div className="alert error-alert">
                <p>{error}</p>
              </div>
            )}
            {message && (
              <div className="alert success-alert">
                <p>{message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;