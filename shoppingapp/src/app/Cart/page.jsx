"use client";
import React from "react";
import { useCart } from "../context/CartContext"; // Import Cart Context
import { useAuth } from "../context/AuthContext"; // Import Auth Context
import "./Cart.css";

const CartPage = () => {
  const { cart, removeItem, totalCost } = useCart();
  const { isLoggedIn, email } = useAuth(); // Get email from AuthContext

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
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

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
