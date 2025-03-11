"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { request, gql } from "graphql-request";

// GraphQL Endpoint
const GRAPHQL_ENDPOINT = "http://127.0.0.1:8000/auth_app/graphql/";

// Create AuthContext
const AuthContext = createContext();

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// AuthProvider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Check session on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    console.log("Checking stored session...");
    console.log("Stored user:", storedUser);
    console.log("Stored token:", storedToken);

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // ✅ Login function
  const login = (username, authToken) => {
    console.log("Saving session for:", username);

    setUser(username);
    setToken(authToken);
    setIsAuthenticated(true);

    localStorage.setItem("user", username);
    localStorage.setItem("token", authToken);
  };

  // ✅ Logout function
  const logout = () => {
    console.log("Logging out...");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
