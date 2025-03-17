import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@apollo/client";

// Mock window.alert
beforeAll(() => {
  window.alert = vi.fn();
});

// Mock Apollo Client
vi.mock("@apollo/client", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useMutation: vi.fn(() => [
      vi.fn(() =>
        Promise.resolve({
          data: {
            login: {
              success: true,
              username: "testuser",
              email: "test@example.com",
            },
          },
        })
      ), // Mock successful response
      { loading: false, error: null },
    ]),
  };
});

// Mock AuthContext
vi.mock("../context/AuthContext", () => ({
  useAuth: vi.fn(() => ({
    isLoggedIn: false,
    login: vi.fn(),
  })),
}));

describe("LoginModal Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders login form correctly", () => {
    render(
      <LoginModal
        isOpen={true}
        closeModal={vi.fn()}
        onLoginSuccess={vi.fn()}
      />
    );

    // Debug the rendered output
    screen.debug();

    // Check if the login form is rendered
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("calls login function when form is submitted", async () => {
    const mockLogin = vi.fn();

    useAuth.mockReturnValue({
      isLoggedIn: false,
      login: mockLogin,
    });

    render(
      <LoginModal
        isOpen={true}
        closeModal={vi.fn()}
        onLoginSuccess={vi.fn()}
      />
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    // Check if the login function was called
    expect(mockLogin).toHaveBeenCalledWith("testuser", "test@example.com");
  });
});