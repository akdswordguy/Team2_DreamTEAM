import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from './page';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Mock the contexts
vi.mock('../context/CartContext', () => ({
  useCart: vi.fn(),
}));

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('CartPage', () => {
  beforeEach(() => {
    useCart.mockReturnValue({
      cart: [
        { id: 1, name: 'Product 1', price: 10.0, quantity: 2 },
        { id: 2, name: 'Product 2', price: 20.0, quantity: 1 },
      ],
      removeItem: vi.fn(),
      totalCost: 40.0,
      increaseQuantity: vi.fn(),
      decreaseQuantity: vi.fn(),
    });

    useAuth.mockReturnValue({
      isLoggedIn: true,
      email: 'test@example.com',
    });

    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the cart title', () => {
    render(<CartPage />);
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
  });

  it('renders the cart items', () => {
    render(<CartPage />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('renders the total cost', () => {
    render(<CartPage />);
    const totalElement = screen.getByText((content, element) => 
      content.startsWith('Total:') && element.textContent.includes('$40.00')
    );
    expect(totalElement).toBeInTheDocument();
  });

  it('calls removeItem when delete button is clicked', () => {
    render(<CartPage />);
    fireEvent.click(screen.getAllByRole('button', { name: /delete/i })[0]);
    expect(useCart().removeItem).toHaveBeenCalledWith(1);
  });

  it('calls increaseQuantity when plus button is clicked', () => {
    render(<CartPage />);
    fireEvent.click(screen.getAllByRole('button', { name: '+' })[0]);
    expect(useCart().increaseQuantity).toHaveBeenCalledWith(1);
  });

  it('calls decreaseQuantity when minus button is clicked', () => {
    render(<CartPage />);
    fireEvent.click(screen.getAllByRole('button', { name: '-' })[0]);
    expect(useCart().decreaseQuantity).toHaveBeenCalledWith(1);
  });

  it('shows an alert if user is not logged in during checkout', () => {
    useAuth.mockReturnValue({
      isLoggedIn: false,
      email: null,
    });

    render(<CartPage />);
    fireEvent.click(screen.getByText('Proceed to Checkout'));
    expect(window.alert).toHaveBeenCalledWith('Please log in to proceed with checkout.');
  });

  it('shows an alert if user email is not found during checkout', () => {
    useAuth.mockReturnValue({
      isLoggedIn: true,
      email: null,
    });

    render(<CartPage />);
    fireEvent.click(screen.getByText('Proceed to Checkout'));
    expect(window.alert).toHaveBeenCalledWith('User email not found. Please try logging in again.');
  });

  it('calls the checkout mutation when user is logged in', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { checkout: { success: true, message: 'Checkout successful' } } }),
      })
    );

    render(<CartPage />);
    fireEvent.click(screen.getByText('Proceed to Checkout'));

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(window.alert).toHaveBeenCalledWith('Checkout successful');
    expect(global.fetch).toHaveBeenCalled();

    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toBe('http://127.0.0.1:8000/auth_app/graphql/');
    expect(options.method).toBe('POST');
    expect(options.headers['Content-Type']).toBe('application/json');

    const bodyObj = JSON.parse(options.body);
    expect(bodyObj.query).toContain('mutation');
    expect(bodyObj.query).toContain('checkout(email: "test@example.com")');
    expect(bodyObj.query).toContain('message');
    expect(bodyObj.query).toContain('success');

    fetch.mockRestore();
  });
});
