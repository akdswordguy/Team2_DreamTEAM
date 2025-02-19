'use client'
import { useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./style.css";  // External CSS

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState({ min: "", max: "" });
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const toggleSize = (size) => {
    setSelectedSize((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const products = [
    {
      id: 1,
      name: "Zara Bomber Jacket",
      price: 100,
      image: "/product1.jpg", // Replace with actual image path
      colors: ["#000000", "#FF0000", "#008000"], // Black, Red, Green
    },
    {
      id: 2,
      name: "LV Striped Shirt",
      price: 120,
      image: "/product2.jpg",
      colors: ["#FFFFFF", "#FFD700", "#0000FF"], // White, Gold, Blue
    },
    {
      id: 3,
      name: "Crochet Jacket",
      price: 90,
      image: "/product3.jpg",
      colors: ["#8B4513", "#FFA500", "#000000"], // Brown, Orange, Black
    },
    {
      id: 4,
      name: "Flower Power Shirt",
      price: 80,
      image: "/product4.jpg",
      colors: ["#008000", "#FF69B4", "#0000FF"], // Green, Pink, Blue
    },
    {
      id: 5,
      name: "Patched Up Shirt",
      price: 110,
      image: "/product5.jpg",
      colors: ["#FFFFFF", "#808080", "#FF4500"], // White, Gray, Orange
    },
    {
      id: 6,
      name: "Simple Lazy Shirt",
      price: 95,
      image: "/product6.jpg",
      colors: ["#000000", "#32CD32", "#B22222"], // Black, Lime Green, Firebrick
    },
    {
      id: 7,
      name: "Coloured Up",
      price: 105,
      image: "/product7.jpg",
      colors: ["#FFD700", "#8A2BE2", "#DC143C"], // Gold, BlueViolet, Crimson
    },
    {
      id: 8,
      name: "Green Leaf Pattern",
      price: 99,
      image: "/product8.jpg",
      colors: ["#228B22", "#D2691E", "#708090"], // Forest Green, Chocolate, Slate Gray
    },
    {
      id: 9,
      name: "Faded Past",
      price: 115,
      image: "/product9.jpg",
      colors: ["#C0C0C0", "#4682B4", "#A52A2A"], // Silver, Steel Blue, Brown
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

      {/* Shop Container */}
      <div className="shop-container">
        {/* Filter Sidebar */}
        <div className="filter-bar">
          <h3>Filter Products</h3>

          {/* Category Filter */}
          <div className="filter-section">
            <button className="filter-toggle" onClick={() => toggleCategory("category")}>
              Category ▼
            </button>
            {selectedCategory === "category" && (
              <div className="filter-options">
                <label><input type="checkbox" /> Shirts <span>127</span></label>
                <label><input type="checkbox" /> Shoes <span>89</span></label>
                <label><input type="checkbox" /> Jackets <span>93</span></label>
                <label><input type="checkbox" /> Pants <span>102</span></label>
                <label><input type="checkbox" /> Hoodies <span>43</span></label>
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="filter-section">
            <button className="filter-toggle" onClick={() => toggleCategory("price")}>
              Price ▼
            </button>
            {selectedCategory === "price" && (
              <div className="filter-options">
                <input type="number" placeholder="From" />
                <input type="number" placeholder="To" />
              </div>
            )}
          </div>
          

          {/* Color Filter */}
          <div className="filter-section">
            <button className="filter-toggle" onClick={() => toggleCategory("color")}>
              Color ▼
            </button>
            {selectedCategory === "color" && (
              <div className="color-options">
                {["red", "green", "blue", "yellow", "black", "white", "brown", "purple"].map((color) => (
                  <div
                    key={color}
                    className={`color-circle ${selectedColor === color ? "selected" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            )}
          </div>
          

          {/* Size Filter */}
          <div className="filter-section">
            <button className="filter-toggle" onClick={() => toggleCategory("size")}>
              Size ▼
            </button>
            {selectedCategory === "size" && (
              <div className="filter-options">
                {["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                  <label key={size}>
                    <input type="checkbox" onChange={() => toggleSize(size)} checked={selectedSize.includes(size)} />
                    {size}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
