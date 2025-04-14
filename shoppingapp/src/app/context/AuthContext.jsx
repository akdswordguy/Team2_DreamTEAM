"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { gql, GraphQLClient } from "graphql-request";
import Cookies from "js-cookie";

const AuthContext = createContext();

const GET_USER_ID_BY_USERNAME = gql`
  query GetUserIdByUsername($username: String!) {
    userIdByUsername(username: $username)
  }
`;

const gqlClient = new GraphQLClient("https://team2-dreamteam.onrender.com/auth_app/graphql/");

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    username: null,
    email: null,
    userId: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authCookie = Cookies.get("auth");

    if (authCookie) {
      let parsedAuth;
      try {
        parsedAuth = JSON.parse(authCookie);
      } catch (err) {
        console.error("Invalid auth cookie JSON", err);
        Cookies.remove("auth", { path: "" });
        setIsLoading(false);
        return;
      }

      if (parsedAuth.username) {
        fetchUserIdByUsername(parsedAuth.username)
          .then((userId) => {
            setAuth({ ...parsedAuth, userId });
          })
          .catch((err) => {
            console.error("Failed to fetch user ID", err);
            Cookies.remove("auth", { path: "" });
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setAuth(parsedAuth);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserIdByUsername = async (username) => {
    try {
      const variables = { username };
      const data = await gqlClient.request(GET_USER_ID_BY_USERNAME, variables);
      return data.userIdByUsername;
    } catch (error) {
      console.error("GraphQL Error:", error.response?.errors || error.message);
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
    Cookies.remove("auth", { path: "" });
    console.log("User Logged Out");
  };

  console.log("Current Auth State:", auth);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
