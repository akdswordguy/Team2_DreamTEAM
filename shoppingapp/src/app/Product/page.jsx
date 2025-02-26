"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./styles.css"; // External CSS

const ProductPage = () => {
  const [mainImage, setMainImage] = useState("/product-1.png");

  return (
    <div className="product-page">
      {/* Navbar - DO NOT TOUCH */}
      <nav className="navbar">
        <div className="logo-container">
          <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
          <div className="logo">LUXORA</div>
        </div>
        <ul className="nav-links">
          <li><Link href="./">Home</Link></li>
          <li><Link href="/Shop">Shop</Link></li>
          <li><Link href="#">About</Link></li>
          <li><Link href="#">Contact</Link></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button className="search-button">
            <Image src="/maginifying.png" alt="Search" width={18} height={18} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        <div className="product-section">
          {/* Image Gallery */}
          <div className="image-gallery">
            <div className="thumbnail-container">
              {["/product-1.png", "/product-2.png", "/product-3.png"].map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  width={60}
                  height={60}
                  className="thumbnail"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
            <div className="main-image">
              <Image src={mainImage} alt="Main Product" width={400} height={500} className="rounded-image" />
            </div>
          </div>

          {/* Product Information */}
          <div className="product-info">
            <h1 className="title">Low-Cut Brown Shirt</h1>
            <p className="rating">★★★★★</p>
            <p className="size-label">Size</p>
            <div className="sizes">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button key={size} className="size-button">{size}</button>
              ))}
            </div>
            <p className="price">Price: $200</p>
            <button className="cart-button">Add to Cart</button>
            
            {/* Product Details */}
            <div className="product-details">
              <h3>Product Details</h3>
              <p>Trafted from premium 100% cotton, this ultra-soft crewneck tee offers a perfect blend of comfort and style. 
                Designed for a relaxed fit, it features breathable fabric, durable stitching, and a timeless silhouette that pairs effortlessly with any outfit. 
                Available in multiple colors, 
                it's a versatile wardrobe essential for everyday wear.</p>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="customer-reviews">
          <h2>Customer Reviews</h2>
          <div className="review-cards">
            {[1, 2, 3].map((review) => (
              <div key={review} className="review-card">
                <p><strong>John Doe</strong></p>
                <p>★★★★★</p>
                <p>Amazing product! Highly recommend.</p>
              </div>
            ))}
          </div>
          {/* Create Review Button */}
          <button className="create-review-button">Write a Review</button>
        </div>

        {/* Similar Products */}
        <h2 className="gallery-title">Product Gallery / Similar Products</h2>
        <div className="similar-products">
          {["/model-7.jpg", "/model-3.jpg", "/model-5.jpg", "/model-6.jpg"].map((img, index) => (
            <div key={index} className="product-card">
              <Image src={img} alt={`Similar Product ${index + 1}`} width={150} height={200} className="card-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
