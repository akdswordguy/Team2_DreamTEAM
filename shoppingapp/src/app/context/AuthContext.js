"use client";

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    username: null,
  });

  const login = (username) => {
    setAuth({
      isLoggedIn: true,
      username,
    });
  };

  const logout = () => {
    setAuth({
      isLoggedIn: false,
      username: null,
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
