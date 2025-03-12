"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    username: null,
    email: null,
  });

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  const login = (username, email) => {
    const newAuthState = {
      isLoggedIn: true,
      username,
      email,
    };
    setAuth(newAuthState);
    localStorage.setItem("auth", JSON.stringify(newAuthState)); // Save to localStorage
  };

  const logout = () => {
    setAuth({
      isLoggedIn: false,
      username: null,
      email: null,
    });
    localStorage.removeItem("auth"); // Clear storage on logout
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
