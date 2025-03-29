import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@apollo/client";

beforeAll(() => {
  window.alert = vi.fn();
});

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
      ),
      { loading: false, error: null },
    ]),
  };
});

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

    screen.debug();

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

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    expect(mockLogin).toHaveBeenCalledWith("testuser", "test@example.com");
  });
});