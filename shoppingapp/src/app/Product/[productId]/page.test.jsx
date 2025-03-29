import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { useCart } from '../../context/CartContext';
import ProductPage from './page';

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
}));

vi.mock('@apollo/client', () => ({
  useQuery: vi.fn(),
  gql: vi.fn(),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

vi.mock('../../context/CartContext', () => ({
  useCart: vi.fn(),
}));

vi.mock('../../utils/apollo-client', () => ({
  productClient: {},
}));

describe('ProductPage', () => {
  const mockAddItem = vi.fn();
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test description',
    price: 99.99,
    imageUrl: '/test-product.jpg',
    category: {
      id: 1,
      name: 'Test Category',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useParams.mockReturnValue({ productId: '1' });
    useCart.mockReturnValue({ addItem: mockAddItem });
  });

  it('shows loading state initially', () => {
    useQuery.mockReturnValue({ loading: true });
    render(<ProductPage />);
    expect(screen.getByText('Loading product details...')).toBeInTheDocument();
  });

  it('shows error state when query fails', () => {
    const errorMessage = 'Failed to load product';
    useQuery.mockReturnValue({ error: { message: errorMessage } });
    render(<ProductPage />);
    expect(screen.getByText(`Error loading product: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders product details when data is loaded', async () => {
    useQuery.mockReturnValue({ 
      data: { product: mockProduct },
      loading: false,
      error: undefined,
    });

    render(<ProductPage />);

    await waitFor(() => {
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
      expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
      expect(screen.getByText(`Back to ${mockProduct.category.name}`)).toBeInTheDocument();
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('renders size selection buttons', async () => {
    useQuery.mockReturnValue({ 
      data: { product: mockProduct },
      loading: false,
      error: undefined,
    });

    render(<ProductPage />);

    await waitFor(() => {
      expect(screen.getByText('S')).toBeInTheDocument();
      expect(screen.getByText('M')).toBeInTheDocument();
      expect(screen.getByText('L')).toBeInTheDocument();
      expect(screen.getByText('XL')).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('calls addItem when Add to Cart button is clicked', async () => {
    useQuery.mockReturnValue({ 
      data: { product: mockProduct },
      loading: false,
      error: undefined,
    });

    render(<ProductPage />);

    await waitFor(() => {
      const addToCartButton = screen.getByText('Add to Cart');
      fireEvent.click(addToCartButton);
      expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
    }, { timeout: 5000 });
  });

  it('renders default values when product data is incomplete', async () => {
    useQuery.mockReturnValue({ 
      data: { product: {} },
      loading: false,
      error: undefined,
    });

    render(<ProductPage />);

    await waitFor(() => {
      expect(screen.getByText(/unknown product/i)).toBeInTheDocument();
      expect(screen.getByText(/no description available/i)).toBeInTheDocument();
      expect(screen.getByText(/n\/a/i)).toBeInTheDocument();
      expect(screen.getByText(/back to products/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('renders default image when imageUrl is not provided', async () => {
    useQuery.mockReturnValue({ 
      data: { product: { ...mockProduct, imageUrl: undefined } },
      loading: false,
      error: undefined,
    });

    render(<ProductPage />);
    
    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/default-product.jpg');
    }, { timeout: 5000 });
  });
});