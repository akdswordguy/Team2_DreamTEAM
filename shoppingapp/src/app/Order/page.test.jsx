import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import OrderPage from './page';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    isLoggedIn: false,
    email: '',
  })),
}));

vi.mock('../context/CartContext', () => ({
  useCart: vi.fn(() => ({
    clearCart: vi.fn(),
  })),
}));

vi.mock('../components/NavBar', () => ({
  __esModule: true,
  default: () => <div>Mocked NavBar</div>,
}));

global.fetch = vi.fn();

describe('OrderPage', () => {
  const mockRouterPush = vi.fn();
  const mockClearCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useRouter.mockReturnValue({ push: mockRouterPush });
    useAuth.mockReturnValue({ isLoggedIn: true, email: 'test@example.com' });
    useCart.mockReturnValue({ clearCart: mockClearCart });
    fetch.mockReset();
  });

  it('redirects to login when not authenticated', () => {
    useAuth.mockReturnValueOnce({ isLoggedIn: false, email: '' });
    render(<OrderPage />);
    expect(mockRouterPush).toHaveBeenCalledWith('/login');
  });

  it('shows loading state initially', () => {
    render(<OrderPage />);
    expect(screen.getByText('Processing your order...')).toBeInTheDocument();
  });

  it('sends confirmation email on mount', async () => {
    const mockResponse = {
      data: {
        checkout: {
          message: 'Order confirmed',
          success: true,
        },
      },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    render(<OrderPage />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/auth_app/graphql/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              checkout(email: "test@example.com") {
                message
                success
              }
            }
          `,
        }),
      });
    });
  });

  it('shows success message when email is sent', async () => {
    const mockResponse = {
      data: {
        checkout: {
          message: 'Order confirmed',
          success: true,
        },
      },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    render(<OrderPage />);

    await waitFor(() => {
      expect(screen.getByText('Your order has been successfully placed!')).toBeInTheDocument();
    }, { timeout: 5000 });

    const confirmationElements = [
      'Order confirmed',
      /confirmation email has been sent/i,
      /test@example.com/i
    ];

    confirmationElements.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    expect(mockClearCart).toHaveBeenCalled();
  });

  it('shows error message when email fails to send', async () => {
    const mockResponse = {
      data: {
        checkout: {
          message: 'Failed to send email',
          success: false,
        },
      },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    render(<OrderPage />);

    await waitFor(() => {
      expect(screen.getByText('Failed to send email')).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('shows generic error when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<OrderPage />);

    await waitFor(() => {
      expect(screen.getByText(/An error occurred while sending the confirmation email/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('clears cart on successful order', async () => {
    const mockResponse = {
      data: {
        checkout: {
          message: 'Order confirmed',
          success: true,
        },
      },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    render(<OrderPage />);

    await waitFor(() => {
      expect(mockClearCart).toHaveBeenCalled();
    }, { timeout: 5000 });
  });
});