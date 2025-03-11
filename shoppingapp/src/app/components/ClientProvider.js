"use client";

import React, { useState } from "react";
import NavBar from "./NavBar";
import LoginModal from "./LoginModal";

const ClientProvider = ({ children }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setLoginModalOpen(false);
    alert("Login successful!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("You have been logged out!");
  };

  return (
    <>
      {/* NavBar */}
      <NavBar
        isLoggedIn={isLoggedIn}
        setShowLogin={setLoginModalOpen}
        onLogout={handleLogout}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        closeModal={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {children}
    </>
  );
};

export default ClientProvider;
