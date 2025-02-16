import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./LandingPage.css";

const LandingPage = () => {
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
    <li><Link href="#">Shop</Link></li>
    <li><Link href="#">About</Link></li>
    <li><Link href="#">Contact</Link></li>
  </ul>
  <div className="search-bar">
    <input type="text" placeholder="Search products..." />
    <button className="search-button">
      <Image src="/maginifying.png" alt="Search" width={18} height={18} />
    </button>
  </div>
  <div className="icons">
    <Link href="/login">
      <Image src="/login-img.png" alt="Login" width={22} height={22} />
    </Link>
  </div>
</nav>



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
      <section className="popular-products">
        <h3 className="section-title">Popular Products</h3>
        <div className="product-grid">
          <div className="product-large">
            <Image src="/gallery_1.jpg" alt="Product 1" width={280} height={280} />
          </div>
          <div className="product-column">
            <Image src="/gallery_4.jpg" alt="Product 2" width={140} height={140} />
            <Image src="/gallery_7.jpg" alt="Product 3" width={140} height={140} />
          </div>
          <div className="product-large">
            <Image src="/gallery_9.jpg" alt="Product 4" width={280} height={280} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">LUXORA</div>
        <ul className="footer-links">
          <li><Link href="#">Home</Link></li>
          <li><Link href="#">Shop</Link></li>
          <li><Link href="#">About</Link></li>
          <li><Link href="#">Contact</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default LandingPage;
