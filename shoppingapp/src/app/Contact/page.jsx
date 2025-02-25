'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./contact.css";

const ContactUs = () => {
  return (
    <div className="signup-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
          <div className="logo">LUXORA</div>
        </div>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="#">Shop</Link></li>
          <li><Link href="#">Contact</Link></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button className="search-button">
            <Image src="/maginifying.png" alt="Search" width={18} height={18} />
          </button>
        </div>
      </nav>

      {/* 📌 Map Section */}
      <div className="map">
        <h2>Our Location</h2>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.2360800246433!2d-74.0097852808383!3d40.711133898676835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1740505976340!5m2!1sen!2sin" 
          width="1828" 
          height="450" 
          style={{ border: "0" }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>

      {/* 📌 "Get In Touch" Section */}
      <div className="contact-container">
        <div className="contact-text">
          <h2>Get In Touch</h2>
          <p>We'd love to hear from you! Whether you have questions, need support, or want to learn more about our services, our team is here to help.</p>
        </div>

        <div className="contact-details">
          {/* Address Section */}
          <div className="contact-card">
            <div className="icon-container">
              <Image src="/house.png" alt="Location" width={30} height={30} />
            </div>
            <div className="contact-info">
              <h4>Our Address</h4>
              <p>Asklepios Tower<br />Makima Street 251</p>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="contact-card">
            <div className="icon-container">
              <Image src="/phone.png" alt="Phone" width={30} height={30} />
            </div>
            <div className="contact-info">
              <h4>Our Contact Info</h4>
              <p>+123 456 789<br />help@luxora.com</p>
            </div>
          </div>
        </div>

        <div className="graphics-feedback">
  {/* Video Instead of Image */}
  <div className="graphics">
  <video autoPlay loop muted playsInline>
    <source src="./graph-vid.webm" type="video/webm" />
    Your browser does not support the video tag.
  </video>
</div>


  {/* Feedback Form */}
  <div className="feedback-form">
    <h3>We Value Your Feedback</h3>
    <p>Let us know your thoughts!</p>
    <input type="text" placeholder="Your Name" />
    <input type="email" placeholder="Your Email" />
    <textarea placeholder="Your Message"></textarea>
    <button>Submit</button>
  </div>
</div>
 {/* Footer */}
 <footer className="footer">
  <div className="footer-container">
    {/* Left Section - Logo & Address */}
    <div className="footer-left">
      <div className="footer-logo-container">
        <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
        <span className="footer-logo">LUXORA</span>
      </div>
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
      </div>
  );
}

export default ContactUs;
