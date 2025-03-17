"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { authClient } from "../utils/apollo-client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import "./LoginModal.css";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      username
      email  
      token
      errors
    }
  }
`;

const LoginModal = ({ isOpen, closeModal, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const { login } = useAuth();

  // GraphQL Mutation
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    client: authClient, 
  });

  const handleLogin = async () => {
    setLoginError(null);

    try {
      const { data } = await loginMutation({
        variables: credentials,
      });

      if (data?.login?.success) {
        login(data.login.username, data.login.email); // ✅ Store username & email in context
        onLoginSuccess();
        closeModal();
        alert(`Welcome back, ${data.login.username}!`);
      } else {
        setLoginError(
          data?.login?.errors || "Invalid credentials, please try again."
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>

        {/* Add labels for inputs */}
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="login-input"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="login-input"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />

        <button
          className="btn login-submit"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="signup-text">
          Don't have an account? <Link href="./Signup">Sign up</Link>
        </p>
        {loginError && <p className="error-text">{loginError}</p>}
      </div>
    </div>
  );
};

export default LoginModal;