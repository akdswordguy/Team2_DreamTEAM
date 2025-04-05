"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { gql, GraphQLClient } from "graphql-request";

const AuthContext = createContext();

const GET_USER_ID_BY_USERNAME = gql`
  query GetUserIdByUsername($username: String!) {
    userIdByUsername(username: $username)
  }
`;

const getClient = () => {
  const token = localStorage.getItem("token");
  return new GraphQLClient("http://127.0.0.1:8000/auth_app/graphql/", {
    headers: {
      Authorization: token ? `JWT ${token}` : "",
    },
  });
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    username: null,
    email: null,
    userId: null,
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    const token = localStorage.getItem("token");

    if (storedAuth && token) {
      const parsedAuth = JSON.parse(storedAuth);
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
      const gqlClient = getClient();
      const data = await gqlClient.request(GET_USER_ID_BY_USERNAME, {
        username,
      });
      return data.userIdByUsername;
    } catch (error) {
      console.error("Error fetching userId by username:", error);
      return null;
    }
  };

  const login = async (username, email, token) => {
    localStorage.setItem("token", token); // ✅ Save token here
    const userId = await fetchUserIdByUsername(username);

    const newAuthState = {
      isLoggedIn: true,
      username,
      email,
      userId,
    };
    setAuth(newAuthState);
    localStorage.setItem("auth", JSON.stringify(newAuthState));
  };

  const logout = () => {
    setAuth({
      isLoggedIn: false,
      username: null,
      email: null,
      userId: null,
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("token"); // ✅ Remove token too
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
