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
  // Use Apollo Client for GraphQL login mutation
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    client: authClient, // Pass authClient here
  });

  const handleLogin = async () => {
    setLoginError(null); // Clear any previous errors

    try {
      const { data } = await loginMutation({
        variables: credentials,
      });

      if (data?.login?.success) {
        login(data.login.username);
        onLoginSuccess(); // Trigger successful login
        closeModal(); // Close the modal
        alert(`Welcome back, ${data?.login?.username}!`);
      } else {
        setLoginError(
          data?.login?.errors || "Invalid credentials, please try again."
        );
      }
    } catch (err) {
      console.error(err); // Log errors for debugging
      setLoginError("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
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
          disabled={loading} // Disable button during loading
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
