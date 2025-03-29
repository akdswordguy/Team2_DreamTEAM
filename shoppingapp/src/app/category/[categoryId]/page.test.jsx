import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { useCart } from '../../context/CartContext';
import CategoryPage from '../[categoryId]/page';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CATEGORY_PRODUCTS } from '../../graphql/categoryQueries';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
  useRouter: vi.fn(),
}));

vi.mock('@apollo/client', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useQuery: vi.fn(),
    ApolloClient: actual.ApolloClient,
    InMemoryCache: actual.InMemoryCache
  };
});

vi.mock('../../context/CartContext', () => ({
  useCart: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: (props) => <img {...props} />,
}));

vi.mock('next/link', () => ({
  default: (props) => <a {...props} />,
}));

describe('CategoryPage', () => {
  const mockPush = vi.fn();
  const mockAddItem = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useParams).mockReturnValue({ categoryId: '1' });
    vi.mocked(useRouter).mockReturnValue({ push: mockPush });
    vi.mocked(useCart).mockReturnValue({ addItem: mockAddItem });
  });

  const mockCategoryData = {
    category: {
      id: 1,
      name: 'Test Category',
      products: [
        {
          id: 1,
          name: 'Test Product 1',
          price: 19.99,
          imageUrl: '/test1.jpg',
          category: 'Test Category',
        },
        {
          id: 2,
          name: 'Test Product 2',
          price: 29.99,
          imageUrl: '/test2.jpg',
          category: 'Test Category',
        },
      ],
    },
  };

  const paginationMockData = {
    category: {
      id: 1,
      name: 'Test Category',
      products: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `Test Product ${i + 1}`,
        price: (i + 1) * 10,
        imageUrl: `/test${i + 1}.jpg`,
        category: 'Test Category',
      })),
    },
  };

  it('renders loading state when data is loading', () => {
    vi.mocked(useQuery).mockReturnValue({ loading: true });
    render(<CategoryPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const errorMessage = 'Failed to fetch data';
    vi.mocked(useQuery).mockReturnValue({ 
      loading: false, 
      error: { message: errorMessage } 
    });
    render(<CategoryPage />);
    expect(screen.getByText(`Error loading category data: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders no products message when no products are found', () => {
    vi.mocked(useQuery).mockReturnValue({ 
      loading: false, 
      data: { category: { products: [] } } 
    });
    render(<CategoryPage />);
    expect(screen.getByText('No products found for this category.')).toBeInTheDocument();
  });

  it('renders products when data is loaded', async () => {
    vi.mocked(useQuery).mockReturnValue({ 
      loading: false, 
      data: mockCategoryData 
    });

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CategoryPage />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
  });

  it('calls addItem when Add to Cart button is clicked', async () => {
    vi.mocked(useQuery).mockReturnValue({ 
      loading: false, 
      data: mockCategoryData 
    });

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CategoryPage />
      </MockedProvider>
    );

    await waitFor(() => {
      const addToCartButtons = screen.getAllByText('Add to Cart');
      fireEvent.click(addToCartButtons[0]);
      expect(mockAddItem).toHaveBeenCalledWith(mockCategoryData.category.products[0]);
    });
  });

  it('handles pagination correctly', async () => {
    vi.mocked(useQuery).mockReturnValue({ 
      loading: false, 
      data: paginationMockData 
    });

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CategoryPage />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();

      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);

      expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
    });
  });

  it('disables previous button on first page and next button on last page', async () => {
    vi.mocked(useQuery).mockReturnValue({ 
      loading: false, 
      data: paginationMockData 
    });

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CategoryPage />
      </MockedProvider>
    );

    await waitFor(() => {
      const prevButton = screen.getByText('Previous');
      const nextButton = screen.getByText('Next');
      expect(prevButton).toBeDisabled();
      expect(nextButton).not.toBeDisabled();
    });

    fireEvent.click(screen.getByText('Next'));
    
    await waitFor(() => {
      const prevButton = screen.getByText('Previous');
      const nextButton = screen.getByText('Next');
      expect(prevButton).not.toBeDisabled();
      expect(nextButton).toBeDisabled();
    });

    fireEvent.click(screen.getByText('Previous'));
    
    await waitFor(() => {
      const prevButton = screen.getByText('Previous');
      const nextButton = screen.getByText('Next');
      expect(prevButton).toBeDisabled();
      expect(nextButton).not.toBeDisabled();
    });
  });
});