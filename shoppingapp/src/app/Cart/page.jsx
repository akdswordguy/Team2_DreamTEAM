'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Cart.css";

const Cart = () => {
  // Sample cart data (replace with backend data later)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Luxury Handbag", price: 120, quantity: 1, image: "/prod1.jpg" },
    { id: 2, name: "Classy Jewelry", price: 80, quantity: 1, image: "/prod2.jpg" }
  ]);

  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleDelete = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-content">

        {/* Navbar */}
        <nav className="navbar-1">
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

        {/* Cart Items Section */}
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                
                <div className="cart-details">
                  <p className="cart-product-name">{item.name}</p>
                </div>

                <div className="cart-actions">
                  <p className="cart-product-price">${item.price.toFixed(2)}</p>
                  <div className="cart-quantity">
                    <button className="qty-btn minus" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span className="qty-count">{item.quantity}</span>
                    <button className="qty-btn plus" onClick={() => increaseQuantity(item.id)}>+</button>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                      <Image src="/wastebin.png" alt="Delete" width={24} height={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-cart">Your cart is empty.</p>
          )}
        </div>

        {/* Checkout Section with Video */}
        <div className="checkout-wrapper">
          <div className="checkout-section">
            <h2 className="checkout-title">Order Summary</h2>
            <p className="checkout-text">Subtotal: <strong>${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</strong></p>
            <p className="checkout-text">Shipping: <strong>Free</strong></p>
            <p className="checkout-total">Total: <strong>${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</strong></p>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>

          {/* Video Section (Placed on the Right) */}
          <div className="video-container">
            <video className="checkout-video" autoPlay loop muted playsInline>
              <source src="/cart-vid.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
