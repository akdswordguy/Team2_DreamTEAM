"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import NavBar from "../components/NavBar";
import "./Cart.css";
import { useParams, useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();
  const { isLoggedIn, userId, email, setShowLogin } = useAuth();
  const { cart, removeItem, totalCost, increaseQuantity, decreaseQuantity } =
    useCart();

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      if (setShowLogin) {
        setShowLogin(true);
      } else {
        alert("Please login to complete your purchase. You'll be redirected to the home page.");
        router.push("/");
        return;
      }
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty. Please add items to your cart before checking out.");
      return;
    }

    try {
      const query = `
        mutation CreateOrder($userId: Int!, $totalAmount: Float!, $status: String!) {
          orderMutations {
            createOrder(userId: $userId, totalAmount: $totalAmount, status: $status) {
              success
              message
              order {
                id
                userId      
                totalPrice  
                status
              }
            }
          }
        }
      `;

      const totalAmount = parseFloat(totalCost.toFixed(2));
      const variables = {
        userId: parseInt(userId),
        totalAmount,
        status: "Pending",
      };

      const response = await fetch("http://127.0.0.1:8000/product/graphql/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const result = await response.json();

      if (result?.data?.orderMutations?.createOrder?.success) {
        router.push("/Order");
      } else {
        alert(
          result?.data?.orderMutations?.createOrder?.message ||
            "Failed to create order. Please try again."
        );
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        "An error occurred while processing your order. Please try again later."
      );
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-content">
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