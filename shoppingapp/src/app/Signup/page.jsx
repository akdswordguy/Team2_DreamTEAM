'use client'
import React,  { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./styles.css";

const SignupPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="signup-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
          <div className="logo">LUXORA</div>
        </div>
        <ul className="nav-links">
          <li><Link href="./Home">Home</Link></li>
          <li><Link href="./Shop">Shop</Link></li>
          <li><Link href="./About">About</Link></li>
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
        {/* Left Side Image */}
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
            <p className="signup-text">Don't have an account? <Link href="./Signup">Sign up</Link></p>
          </div>
        </div>
      )}

          {/* Divider */}
          <div className="divider">- OR -</div>

          <form>
            <div className="input-group">
              <input type="text" placeholder="Full Name" className="signup-input" />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Email" className="signup-input" />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Password" className="signup-input" />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Confirm Password" className="signup-input" />
            </div>

            <button type="submit" className="signup-button">Create Account</button>
          </form>

          <p className="login-link" >Already have an account? <button onClick={() => setShowLogin(true)}>Log In</button></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
