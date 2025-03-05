'use client'
import { useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./style.css";  // External CSS

const ShopPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: null,
    color: null,
    size: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
  };

  const toggleSize = (size) => {
    setSelectedFilters((prev) => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter((s) => s !== size)
        : [...prev.size, size],
    }));
  };

  const products = [
    { id: 1, name: "Zara Bomber Jacket", price: 100, image: "/model-7.jpg", colors: ["#000000", "#f56042", "#008000"] },
    { id: 2, name: "LV Striped Shirt", price: 120, image: "/model-6.jpg", colors: ["#8ab7ff", "#FFD700", "#0000FF"] },
    { id: 3, name: "Crochet Jacket", price: 90, image: "/model-3.jpg", colors: ["#8B4513", "#FFA500", "#000000"] },
    { id: 4, name: "Flower Power Shirt", price: 110, image: "/model-4.jpg", colors: ["#008000", "#FF69B4", "#0000FF"] },
    { id: 5, name: "Flower Power Shirt", price: 180, image: "/model-8.jpg", colors: ["#008000", "#FF69B4", "#0000FF"] }
  ];

  const totalPages = Math.ceil(products.length / productsPerPage);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const displayedProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  return (
    <div className="shop-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
          <div className="logo">LUXORA</div>
        </div>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
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
          <Link href="/Cart" passHref>
          <button className="cart-btn">
            <Image src="/Cart.png" alt="Cart" width={22} height={22} />
          </button></Link>
        
          <Link href="/profileCreation" passHref>
            <button className="profile-btn">
              <Image src="/profile.png" alt="Profile" width={24} height={24} />
              </button>
          </Link>
        </div>
      </nav>

      {/* Banner Section */}
      <div className="banner-container">
        <div className="all-products">
          <Link href="#">All Products &gt;</Link>
        </div>
        <div className="shop-banner">
          <h2>20% OFF ONLY TODAY AND <br /> EARN SPECIAL REWARDS!</h2>
          <p>Shop now for 20% off on our exclusive collection. <br /> Earn extra rewards by joining as a member.</p>
        </div>
      </div>

      {/* Main Shop Container */}
      <div className="shop-container">
        {/* Sidebar Filters */}
        <div className="sidebar">
          <h2>Filters</h2>
          <div className="filter-section">
            <h4>Category</h4>
            {["Jackets", "Shirts", "Jeans", "Flannel"].map((category) => (
              <button
                key={category}
                className={selectedFilters.category === category ? "active" : ""}
                onClick={() => toggleFilter("category", category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="filter-section">
            <h4>Color</h4>
            <div className="color-options">
              {["#000000", "#f56042", "#357524", "#731aab", "#fbff8a", "#8ab7ff", "#8affdc", "#ff8aaf"].map(
                (color, index) => (
                  <div
                    key={index}
                    className={`color-dot ${selectedFilters.color === color ? "selected" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => toggleFilter("color", color)}
                  />
                )
              )}
            </div>
          </div>

          <div className="filter-section">
            <h4>Size</h4>
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={selectedFilters.size.includes(size) ? "active" : ""}
                onClick={() => toggleSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section (Applied Filters + Product Grid) */}
        <div className="right-section">
          {/* Applied Filters Section */}
          <div className="applied-filters">
            <h3>Applied Filters</h3>
            <div>
              {selectedFilters.category && <span>{selectedFilters.category}</span>}
              {selectedFilters.color && (
                <span className="color-indicator" style={{ backgroundColor: selectedFilters.color }} />
              )}
              {selectedFilters.size.length > 0 &&
                selectedFilters.size.map((size) => <span key={size}>{size}</span>)}
            </div>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {displayedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="image-container">
                  <Image src={product.image} alt={product.name} width={300} height={350} className="product-image" />
                </div>
                <div className="product-details">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">${product.price}</span>
                </div>
                <div className="color-variants">
                  {product.colors.map((color, index) => (
                    <div key={index} className="color-dot" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="pagination">
            <button 
              className="page-button" 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-number">Page {currentPage} - {totalPages}</span>
            <button 
              className="page-button" 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          {/* Other Categories*/}
          <div className="other-categories">
      <h2>Other Categories</h2>
      {/* Navigation Arrows */}
      <div className="category-navigation">
        <button className="nav-btn">
          <span>&larr;</span>
        </button>
        <button className="nav-btn">
          <span>&rarr;</span>
        </button>
      </div>
      <div className="categories-container">
        {/* Women's Fashion */}
        <div className="category-card">
          <div className="category-content">
            <h3>Woman’s Fashion</h3>
            <p>Explore our stylish collection of fashion for women</p>
            <Link href="#">
              <button className="explore-btn">
                Explore Now <span>&rarr;</span>
              </button>
            </Link>
          </div>
          <div className="category-image">
            <Image src="/fashion.jpg" alt="Women's Fashion" width={200} height={250} />
          </div>
        </div>

        {/* Accessories */}
        <div className="category-card">
          <div className="category-content">
            <h3>Accessories</h3>
            <p>Explore our wide range of products from shoes, glasses to branded merchandise.</p>
            <Link href="#">
              <button className="explore-btn">
                Explore Now <span>&rarr;</span>
              </button>
            </Link>
          </div>
          <div className="category-image">
            <Image src="/gallery_2.jpg" alt="Accessories" width={200} height={250} />
          </div>
        </div>
      </div>
        </div>
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

export default ShopPage;
