"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext"; // Adjust this path as needed

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { username } = useAuth(); // Get current user
  const [cart, setCart] = useState([]);

  // Load cart from cookies when username changes
  useEffect(() => {
    if (username) {
      const cookieCart = Cookies.get(`cart-${username}`);
      if (cookieCart) {
        try {
          setCart(JSON.parse(cookieCart));
        } catch (error) {
          console.error("Failed to parse cart cookie:", error);
          setCart([]);
        }
      } else {
        setCart([]);
      }
    } else {
      setCart([]); // no user = empty cart
    }
  }, [username]);

  // Save cart to cookies when it changes
  useEffect(() => {
    if (username) {
      Cookies.set(`cart-${username}`, JSON.stringify(cart), { expires: 7 });
    }
  }, [cart, username]);

  const addItem = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== itemId)
    );
  };

  const increaseQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    if (username) {
      Cookies.remove(`cart-${username}`);
    }
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalCost = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const value = {
    cart,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalQuantity,
    totalCost,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
