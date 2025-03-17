import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import NavBar from "./NavBar"; // Import the NavBar component
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { useCart } from "../context/CartContext"; // Import useCart
import { useRouter } from "next/navigation";

// Mock the useAuth hook
vi.mock("../context/AuthContext", () => ({
  useAuth: vi.fn(), // Mock the useAuth hook
}));

// Mock the useCart hook
vi.mock("../context/CartContext", () => ({
  useCart: vi.fn(), // Mock the useCart hook
}));

// Mock the useRouter hook
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(), // Mock the push function
  }),
}));

describe("NavBar Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  test("renders login button when user is not authenticated", () => {
    // Mock useAuth to return an unauthenticated state
    useAuth.mockReturnValue({
      isLoggedIn: false,
      username: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    // Mock useCart to return a default state
    useCart.mockReturnValue({
      totalQuantity: 0, // Mock totalQuantity
    });

    render(<NavBar setShowLogin={vi.fn()} />);

    // Check if the login button is rendered
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    // Check if the logout button is not rendered
    expect(screen.queryByRole("button", { name: /logout/i })).not.toBeInTheDocument();
  });

  test("renders logout button and username when user is authenticated", () => {
    // Mock useAuth to return an authenticated state
    useAuth.mockReturnValue({
      isLoggedIn: true,
      username: "john_doe",
      login: vi.fn(),
      logout: vi.fn(),
    });

    // Mock useCart to return a default state
    useCart.mockReturnValue({
      totalQuantity: 0, // Mock totalQuantity
    });

    render(<NavBar setShowLogin={vi.fn()} />);

    // Check if the logout button and username are rendered
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
    expect(screen.getByText("Welcome, john_doe!")).toBeInTheDocument();
    // Check if the login button is not rendered
    expect(screen.queryByRole("button", { name: /login/i })).not.toBeInTheDocument();
  });

  test("calls logout function when logout button is clicked", () => {
    const mockLogout = vi.fn(); // Mock logout function

    // Mock useAuth to return an authenticated state
    useAuth.mockReturnValue({
      isLoggedIn: true,
      username: "john_doe",
      login: vi.fn(),
      logout: mockLogout,
    });

    // Mock useCart to return a default state
    useCart.mockReturnValue({
      totalQuantity: 0, // Mock totalQuantity
    });

    render(<NavBar setShowLogin={vi.fn()} />);

    // Click the logout button
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    // Check if the logout function was called
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test("calls login function when login button is clicked", () => {
    const mockLogin = vi.fn(); // Mock login function

    // Mock useAuth to return an unauthenticated state
    useAuth.mockReturnValue({
      isLoggedIn: false,
      username: null,
      login: mockLogin,
      logout: vi.fn(),
    });

    // Mock useCart to return a default state
    useCart.mockReturnValue({
      totalQuantity: 0, // Mock totalQuantity
    });

    render(<NavBar setShowLogin={mockLogin} />);

    // Click the login button
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    // Check if the login function was called
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});