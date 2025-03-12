"use client";

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    username: null,
    email: null, // Added email
  });

  const login = (username, email) => {
    setAuth({
      isLoggedIn: true,
      username,
      email, // Store email on login
    });
  };

  const logout = () => {
    setAuth({
      isLoggedIn: false,
      username: null,
      email: null, // Clear email on logout
    });
  };

  const value = {
    ...auth,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
