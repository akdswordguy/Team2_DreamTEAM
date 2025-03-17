"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import NavBar from "../components/NavBar";
import "./Order.css"; // Create a CSS file for styling

const OrderPage = () => {
  const { isLoggedIn, email } = useAuth();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null); // Store order details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login"); // Redirect to login if not logged in
      return;
    }

    sendConfirmationEmail();
  }, [isLoggedIn, router]);

  const sendConfirmationEmail = async () => {
    try {
      // Send confirmation email
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
        clearCart();
        setOrderDetails({ message: result.data.checkout.message });
      } else {
        setError(
          result?.data?.checkout?.message ||
            "Failed to send confirmation email."
        );
      }
    } catch (error) {
      setError(
        "An error occurred while sending the confirmation email. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-container">
      <h1 className="order-title">Order Confirmation</h1>

      <div className="order-content">
        {loading ? (
          <p>Processing your order...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="confirmation-message">
            <p>Your order has been successfully placed!</p>
            <p>{orderDetails?.message}</p>
            <p>
              A confirmation email has been sent to <strong>{email}</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;