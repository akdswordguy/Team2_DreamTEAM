import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

vi.mock('graphql-request', () => {
  return {
    gql: vi.fn((query) => query),
    GraphQLClient: vi.fn().mockImplementation(() => {
      return {
        request: vi.fn().mockResolvedValue({ userIdByUsername: 'mock-user-id' })
      };
    })
  };
});

const TestComponent = () => {
  const { isLoggedIn, username, email, userId, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="isLoggedIn">{isLoggedIn.toString()}</div>
      <div data-testid="username">{username || ''}</div>
      <div data-testid="email">{email || ''}</div>
      <div data-testid="userId">{userId || ''}</div>
      <button data-testid="login-button" onClick={() => login('testuser', 'test@example.com')}>
        Login
      </button>
      <button data-testid="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
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

  it('should login and update auth state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await act(async () => {
      screen.getByTestId('login-button').click();
    });
    
    expect(screen.getByTestId('isLoggedIn').textContent).toBe('true');
    expect(screen.getByTestId('username').textContent).toBe('testuser');
    expect(screen.getByTestId('email').textContent).toBe('test@example.com');
    
    await waitFor(() => {
      expect(screen.getByTestId('userId').textContent).toBe('mock-user-id');
    });
    
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    expect(storedAuth.isLoggedIn).toBe(true);
    expect(storedAuth.username).toBe('testuser');
    expect(storedAuth.email).toBe('test@example.com');
  });

  it('should logout and clear auth state', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    await act(async () => {
      screen.getByTestId('login-button').click();
    });
    
    act(() => {
      screen.getByTestId('logout-button').click();
    });
    
    expect(screen.getByTestId('isLoggedIn').textContent).toBe('false');
    expect(screen.getByTestId('username').textContent).toBe('');
    expect(screen.getByTestId('email').textContent).toBe('');
    
    expect(localStorage.getItem('auth')).toBeNull();
  });

  it('should load auth state from localStorage on mount', async () => {
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
    
    await waitFor(() => {
      expect(screen.getByTestId('isLoggedIn').textContent).toBe('true');
      expect(screen.getByTestId('username').textContent).toBe('storeduser');
      expect(screen.getByTestId('email').textContent).toBe('stored@example.com');
    });
  });
});