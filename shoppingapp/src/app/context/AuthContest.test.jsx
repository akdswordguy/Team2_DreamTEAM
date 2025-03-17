// AuthContest.test.jsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { AuthProvider, useAuth } from './AuthContext'; // Ensure this path is correct

// Helper component to use the auth context in tests
const TestComponent = () => {
  const { isLoggedIn, username, email, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="isLoggedIn">{isLoggedIn.toString()}</div>
      <div data-testid="username">{username || ''}</div>
      <div data-testid="email">{email || ''}</div>
      <button onClick={() => login('testuser', 'test@example.com')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should initialize with default auth state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('isLoggedIn').textContent).toBe('false');
    expect(screen.getByTestId('username').textContent).toBe('');
    expect(screen.getByTestId('email').textContent).toBe('');
  });

  it('should login and update auth state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByText('Login').click();
    });

    expect(screen.getByTestId('isLoggedIn').textContent).toBe('true');
    expect(screen.getByTestId('username').textContent).toBe('testuser');
    expect(screen.getByTestId('email').textContent).toBe('test@example.com');
    expect(localStorage.getItem('auth')).toBe(
      JSON.stringify({
        isLoggedIn: true,
        username: 'testuser',
        email: 'test@example.com',
      })
    );
  });

  it('should logout and clear auth state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // First, log in
    act(() => {
      screen.getByText('Login').click();
    });

    // Then, log out
    act(() => {
      screen.getByText('Logout').click();
    });

    expect(screen.getByTestId('isLoggedIn').textContent).toBe('false');
    expect(screen.getByTestId('username').textContent).toBe('');
    expect(screen.getByTestId('email').textContent).toBe('');
    expect(localStorage.getItem('auth')).toBeNull();
  });

  it('should load auth state from localStorage on mount', () => {
    const storedAuth = {
      isLoggedIn: true,
      username: 'storeduser',
      email: 'stored@example.com',
    };
    localStorage.setItem('auth', JSON.stringify(storedAuth));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('isLoggedIn').textContent).toBe('true');
    expect(screen.getByTestId('username').textContent).toBe('storeduser');
    expect(screen.getByTestId('email').textContent).toBe('stored@example.com');
  });
});