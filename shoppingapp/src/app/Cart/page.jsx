"use client";

import React from "react";
import { useCart } from "../context/CartContext"; // Import Cart Context
import { useAuth } from "../context/AuthContext";
import "./Cart.css";

const CartPage = () => {
  const { cart, removeItem, totalCost } = useCart(); // Updated destructuring
  const { isLoggedIn, logout, username } = useAuth();
  const handleCheckout = () => {
    if (!isLoggedIn) {
      // Alert if user is not logged in
      alert("Please log in to proceed with checkout.");
    } else {
      // Proceed with checkout if logged in
      alert("Thank you for your purchase! Proceeding to checkout...");
    }
  };
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {/* Check if the cart is empty */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {/* List Cart Items */}
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)} // Use removeItem from CartContext
                  className="remove-btn"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Total Price */}
          <h2>Total Price: ${totalCost}</h2>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
