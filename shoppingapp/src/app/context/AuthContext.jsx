"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { gql, GraphQLClient } from "graphql-request";
import { useCart } from "./CartContext"; // Import useCart

const AuthContext = createContext();

const GET_USER_ID_BY_USERNAME = gql`
  query GetUserIdByUsername($username: String!) {
    userIdByUsername(username: $username)
  }
`;

const gqlClient = new GraphQLClient("http://127.0.0.1:8000/auth_app/graphql/"); // Replace with your backend GraphQL endpoint

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    username: null,
    email: null,
    userId: null,
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    console.log("Stored Auth from localStorage:", storedAuth);

    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);

      console.log("parsedAuth ", JSON.stringify(parsedAuth));

      if (parsedAuth.username) {
        fetchUserIdByUsername(parsedAuth.username).then((userId) => {
          setAuth({ ...parsedAuth, userId });
        });
      } else {
        setAuth(parsedAuth);
      }
    }
  }, []);

  const fetchUserIdByUsername = async (username) => {
    try {
      const data = await gqlClient.request(GET_USER_ID_BY_USERNAME, {
        username,
      });
      console.log("Fetched userID by username:", data.userIdByUsername); // 🔍 Debugging
      return data.userIdByUsername;
    } catch (error) {
      console.error("Error fetching userId by username:", error);
      return null;
    }
  };

  const login = async (username, email) => {
    const userId = await fetchUserIdByUsername(username);
    const newAuthState = {
      isLoggedIn: true,
      username,
      email,
      userId,
    };
    setAuth(newAuthState);
    localStorage.setItem("auth", JSON.stringify(newAuthState));
    console.log("User Logged In:", newAuthState);
  };

  const logout = () => {
    setAuth({
      isLoggedIn: false,
      username: null,
      email: null,
      userId: null, // Clear the userId as well
    });
    localStorage.removeItem("auth");

    console.log("User Logged Out and Cart Cleared"); // 🔍 Debugging Line
  };

  console.log("Current Auth State:", auth); // 🔍 Debugging Line

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);