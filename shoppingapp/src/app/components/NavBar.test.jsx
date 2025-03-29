import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import NavBar from "./NavBar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

vi.mock("../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../context/CartContext", () => ({
  useCart: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("NavBar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders login button when user is not authenticated", () => {
    useAuth.mockReturnValue({
      isLoggedIn: false,
      username: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    useCart.mockReturnValue({
      totalQuantity: 0,
      clearCart: vi.fn(),
    });

    render(<NavBar setShowLogin={vi.fn()} />);

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /logout/i })).not.toBeInTheDocument();
  });

  test("renders logout button and username when user is authenticated", () => {
    useAuth.mockReturnValue({
      isLoggedIn: true,
      username: "john_doe",
      login: vi.fn(),
      logout: vi.fn(),
    });

    useCart.mockReturnValue({
      totalQuantity: 0,
      clearCart: vi.fn(),
    });

    render(<NavBar setShowLogin={vi.fn()} />);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
    expect(screen.getByText("Welcome, john_doe!")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /login/i })).not.toBeInTheDocument();
  });

  test("calls logout function when logout button is clicked", () => {
    const mockLogout = vi.fn();
    const mockClearCart = vi.fn();

    useAuth.mockReturnValue({
      isLoggedIn: true,
      username: "john_doe",
      login: vi.fn(),
      logout: mockLogout,
    });

    useCart.mockReturnValue({
      totalQuantity: 0,
      clearCart: mockClearCart,
    });

    render(<NavBar setShowLogin={vi.fn()} />);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  test("calls login function when login button is clicked", () => {
    const mockLogin = vi.fn();

    useAuth.mockReturnValue({
      isLoggedIn: false,
      username: null,
      login: mockLogin,
      logout: vi.fn(),
    });

    useCart.mockReturnValue({
      totalQuantity: 0,
      clearCart: vi.fn(),
    });

    render(<NavBar setShowLogin={mockLogin} />);

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});