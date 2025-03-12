"use client";
import React from "react";
import { useCart } from "../context/CartContext"; // Import Cart Context
import { useAuth } from "../context/AuthContext"; // Import Auth Context
import Image from "next/image";
import "./Cart.css";
import NavBar from "../components/NavBar"; // Import NavBar component

const CartPage = () => {
  const { isLoggedIn, email } = useAuth(); // Get email from AuthContext
  const { cart, removeItem, totalCost, increaseQuantity, decreaseQuantity } = useCart();


  const handleCheckout = async () => {
    if (!isLoggedIn) {
      alert("Please log in to proceed with checkout.");
      return;
    }

    if (!email) {
      alert("User email not found. Please try logging in again.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth_app/graphql/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              checkout(email: "${email}") {
                message
                success
              }
            }
          `,
        }),
      });

      const result = await response.json();
      if (result?.data?.checkout?.success) {
        alert(result.data.checkout.message);
      } else {
        alert("Failed to initiate checkout. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred while processing your order.");
    }
  };

  return (
    <div className="cart-container">

      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-content">
        {/* Cart Items Section */}
        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="cart-item">

                <div className="cart-details">
                  <p className="cart-product-name">{item.name}</p>
                </div>

                <div className="cart-actions">
                  <p className="cart-product-price">${item.price.toFixed(2)}</p>
                  <div className="cart-quantity">
                    <button
                      className="qty-btn minus"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="qty-count">{item.quantity}</span>
                    <button
                      className="qty-btn plus"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <Image
                        src="/wastebin.png"
                        alt="Delete"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-cart">Your cart is empty.</p>
          )}
        </div>

        {/* Checkout Section */}
        <div className="checkout-wrapper">
          <div className="checkout-section">
            <h2 className="checkout-title">Order Summary</h2>
            <p className="checkout-text">
              Subtotal: <strong>${totalCost.toFixed(2)}</strong>
            </p>
            <p className="checkout-text">
              Shipping: <strong>Free</strong>
            </p>
            <p className="checkout-total">
              Total: <strong>${totalCost.toFixed(2)}</strong>
            </p>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            
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

export default CartPage;