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
      {
        id: 1,
        name: "Zara Bomber Jacket",
        price: 100,
        image: "/model-1.png",
        colors: ["#000000", "#FF0000", "#008000"],
      },
      {
        id: 2,
        name: "LV Striped Shirt",
        price: 120,
        image: "/model-6.jpg",
        colors: ["#FFFFFF", "#FFD700", "#0000FF"],
      },
      {
        id: 3,
        name: "Crochet Jacket",
        price: 90,
        image: "/model-3.jpg",
        colors: ["#8B4513", "#FFA500", "#000000"],
      },
      {
        id: 4,
        name: "Flower Power Shirt",
        price: 80,
        image: "/model-4.jpg",
        colors: ["#008000", "#FF69B4", "#0000FF"],
      },
    ];
  

  return (
    <div className="shop-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
          <div className="logo">LUXORA</div>
        </div>
        <ul className="nav-links">
          <li><Link href="./">Home</Link></li>
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
          <button className="cart-btn">
            <Image src="/Cart.png" alt="Cart" width={22} height={22} />
          </button>
          <button className="profile-btn">
            <Image src="/profile.png" alt="Profile" width={24} height={24} />
          </button>
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

      <div className="shop-container">

            {/* Sidebar Filters */}
            <div className="sidebar">
              <h2>Filters</h2>
              <div className="filter-section">
                <h4>Category</h4>
                <button
                  className={selectedFilters.category === "Jackets" ? "active" : ""}
                  onClick={() => toggleFilter("category", "Jackets")}
                >
                  Jackets
                </button>
                <button
                  className={selectedFilters.category === "Shirts" ? "active" : ""}
                  onClick={() => toggleFilter("category", "Shirts")}
                >
                  Shirts
                </button>
                <button
                  className={selectedFilters.category === "Jeans" ? "active" : ""}
                  onClick={() => toggleFilter("category", "Jeans")}
                >
                  Jeans
                </button>
                <button
                  className={selectedFilters.category === "Flannel" ? "active" : ""}
                  onClick={() => toggleFilter("category", "Flannel")}
                >
                  Flannel
                </button>
              </div>

              <div className="filter-section">
                <h4>Color</h4>
                <div className="color-options">
                  {["#000000", "#f56042", "#357524", "#731aab", "#fbff8a","#8ab7ff","#8affdc","#ff8aaf"].map(
                    (color, index) => (
                      <div
                        key={index}
                        className={`color-dot ${
                          selectedFilters.color === color ? "selected" : ""
                        }`}
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

            {/* Applied Filters Section */}
            <div className="applied-filters">
              <h3>Applied Filters</h3>
              <div>
                {selectedFilters.category && <span>{selectedFilters.category}</span>}
                {selectedFilters.color && (
                  <span
                    className="color-indicator"
                    style={{ backgroundColor: selectedFilters.color }}
                  />
                )}
                {selectedFilters.size.length > 0 &&
                  selectedFilters.size.map((size) => <span key={size}>{size}</span>)}
              </div>
            </div>

            {/* Product Grid */}
            <div className="product-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="image-container">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={350}
                      className="product-image"
                    />
                  </div>
                  <div className="product-details">
                  <div class="product-details">
                          <span class="product-name">Zara Bomber Jacket</span>
                          <span class="product-price">$100</span>
                  </div>
                    <div className="color-variants">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="color-dot"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  );
};

export default ShopPage;
