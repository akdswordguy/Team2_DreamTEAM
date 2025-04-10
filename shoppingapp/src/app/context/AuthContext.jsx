"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { gql, GraphQLClient } from "graphql-request";
import Cookies from 'js-cookie'; // Import cookies library

const AuthContext = createContext();

const GET_USER_ID_BY_USERNAME = gql`
  query GetUserIdByUsername($username: String!) {
    userIdByUsername(username: $username)
  }
`;

const gqlClient = new GraphQLClient("http://127.0.0.1:8000/auth_app/graphql/");

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    username: null,
    email: null,
    userId: null,
  });

  useEffect(() => {
    const authCookie = Cookies.get("auth");
    console.log("Stored Auth from cookie:", authCookie);

    if (authCookie) {
      let parsedAuth;
      try {
        parsedAuth = JSON.parse(authCookie);
      } 
      catch (err) {
        console.error("Invalid auth cookie JSON", err);
        Cookies.remove("auth"); 
        return;
      }

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
      const variables = { username };
      const data = await gqlClient.request(GET_USER_ID_BY_USERNAME, variables);
      return data.userIdByUsername;
    } catch (error) {
      console.error("Error:", error.response?.errors || error.message);
      throw error;
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
    // Set cookie with 7 day expiration
    Cookies.set("auth", JSON.stringify(newAuthState), { expires: 7 });
    console.log("User Logged In:", newAuthState);
  };

  const logout = () => {
    setAuth({
      isLoggedIn: false,
      username: null,
      email: null,
      userId: null,
    });
    Cookies.remove("auth");
    console.log("User Logged Out and Cart Cleared");
  };

  console.log("Current Auth State:", auth);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);