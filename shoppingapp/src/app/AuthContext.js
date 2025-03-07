"use client";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check login state on app load
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);

  const login = async (username, password) => {
    if (isAuthenticated) {
      alert("You are already logged in!");
      return;
    }

    try {
      const response = await fetch("/auth_app/graphql/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation Login($username: String!, $password: String!) {
              login(username: $username, password: $password) {
                success
                username
                token
                errors
              }
            }
          `,
          variables: { username, password },
        }),
      });

      const data = await response.json();
      const loginResult = data.data.login;

      if (loginResult.success) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        alert(`Welcome back, ${loginResult.username}!`);
      } else {
        alert(loginResult.errors || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
