// Cart/page.test.jsx
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartPage from './page';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Mock next/navigation instead of next/router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useParams: () => ({}),
}));

// Mock the Image component from next/image
vi.mock('next/image', () => ({
  default: (props) => <img {...props} />
}));

// Mock the NavBar component
vi.mock('../components/NavBar', () => ({
  default: () => <div data-testid="navbar-mock">Navbar Mock</div>
}));

// Mock the contexts
vi.mock('../context/CartContext', () => ({
  useCart: vi.fn(),
}));

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('CartPage', () => {
  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();
    
    // Mock the CartContext with initial cart state
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

    // Mock the AuthContext with a logged-in user
    useAuth.mockReturnValue({
      isLoggedIn: true,
      userId: '123',
      email: 'test@example.com',
    });

    // Mock window.alert
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    // Mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ 
          data: { 
            orderMutations: { 
              createOrder: { 
                success: true, 
                message: 'Order created successfully' 
              } 
            } 
          } 
        }),
      })
    );
  });

  afterEach(() => {
    // Restore all mocks after each test
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
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
    const totalElement = screen.getByText(/Total:/);
    const totalPrice = totalElement.closest('.checkout-total').querySelector('strong');
    expect(totalPrice).toHaveTextContent('$40.00');
  });

  it('calls removeItem when delete button is clicked', () => {
    render(<CartPage />);
    // Use a more specific selector since the Delete button may not have a text label
    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButtons[0]);
    expect(useCart().removeItem).toHaveBeenCalledWith(1);
  });

  it('calls increaseQuantity when plus button is clicked', () => {
    render(<CartPage />);
    const plusButtons = screen.getAllByText('+');
    fireEvent.click(plusButtons[0]);
    expect(useCart().increaseQuantity).toHaveBeenCalledWith(1);
  });

  it('calls decreaseQuantity when minus button is clicked', () => {
    render(<CartPage />);
    const minusButtons = screen.getAllByText('-');
    fireEvent.click(minusButtons[0]);
    expect(useCart().decreaseQuantity).toHaveBeenCalledWith(1);
  });

  it('shows an alert if user is not logged in during checkout', () => {
    useAuth.mockReturnValue({
      isLoggedIn: false,
      userId: null,
      email: null,
    });

    render(<CartPage />);
    fireEvent.click(screen.getByText('Proceed to Checkout'));
    expect(window.alert).toHaveBeenCalledWith('Please log in to proceed with checkout.');
  });

  it('shows an alert if user email is not found during checkout', () => {
    useAuth.mockReturnValue({
      isLoggedIn: true,
      userId: null,
      email: null,
    });

    render(<CartPage />);
    fireEvent.click(screen.getByText('Proceed to Checkout'));
    expect(window.alert).toHaveBeenCalledWith('User information is incomplete. Please try logging in again.');
  });

  it('calls the checkout mutation when user is logged in', async () => {
    render(<CartPage />);
    fireEvent.click(screen.getByText('Proceed to Checkout'));

    // Wait for the fetch call to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Verify the fetch call
    const fetchCalls = global.fetch.mock.calls;
    expect(fetchCalls[0][0]).toBe('http://127.0.0.1:8000/product/graphql/');
    
    const options = fetchCalls[0][1];
    expect(options.method).toBe('POST');
    expect(options.headers['Content-Type']).toBe('application/json');

    const bodyObj = JSON.parse(options.body);
    expect(bodyObj.query).toContain('mutation CreateOrder');
    expect(bodyObj.variables).toEqual({
      userId: 123,
      totalAmount: 40.00,
      status: 'Pending'
    });
  });
});