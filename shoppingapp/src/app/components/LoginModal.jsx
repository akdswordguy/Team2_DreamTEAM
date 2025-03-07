"use client";

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { authClient } from "../utils/apollo-client";

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
        onLoginSuccess();
        closeModal();
        alert(`Welcome back, ${data?.login?.username}!`);
      } else {
        setLoginError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setLoginError("Login failed. Please try again.");
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
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {loginError && <p className="error-text">{loginError}</p>}
      </div>
    </div>
  );
};

export default LoginModal;
