import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('CartProvider', () => {
  beforeEach(() => {
    // Clear localStorage and reset mocks before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize cart from localStorage', () => {
    const initialCart = [{ id: 1, name: 'Item 1', price: 10, quantity: 2 }];
    localStorage.setItem('cart', JSON.stringify(initialCart));

    const TestComponent = () => {
      const { cart } = useCart();
      return <div data-testid="cart">{JSON.stringify(cart)}</div>;
    };

    const { getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(getByTestId('cart').textContent).toBe(JSON.stringify(initialCart));
  });

  it('should add an item to the cart', () => {
    const TestComponent = () => {
      const { cart, addItem } = useCart();
      return (
        <div>
          <button onClick={() => addItem({ id: 1, name: 'Item 1', price: 10 })}>
            Add Item
          </button>
          <div data-testid="cart">{JSON.stringify(cart)}</div>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      getByText('Add Item').click();
    });

    expect(getByTestId('cart').textContent).toContain(
      JSON.stringify([{ id: 1, name: 'Item 1', price: 10, quantity: 1 }])
    );
  });

  it('should remove an item from the cart', () => {
    const initialCart = [{ id: 1, name: 'Item 1', price: 10, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(initialCart));

    const TestComponent = () => {
      const { cart, removeItem } = useCart();
      return (
        <div>
          <button onClick={() => removeItem(1)}>Remove Item</button>
          <div data-testid="cart">{JSON.stringify(cart)}</div>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      getByText('Remove Item').click();
    });

    expect(getByTestId('cart').textContent).toBe(JSON.stringify([]));
  });

  it('should increase the quantity of an item in the cart', () => {
    const initialCart = [{ id: 1, name: 'Item 1', price: 10, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(initialCart));

    const TestComponent = () => {
      const { cart, increaseQuantity } = useCart();
      return (
        <div>
          <button onClick={() => increaseQuantity(1)}>Increase Quantity</button>
          <div data-testid="cart">{JSON.stringify(cart)}</div>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      getByText('Increase Quantity').click();
    });

    expect(getByTestId('cart').textContent).toContain(
      JSON.stringify([{ id: 1, name: 'Item 1', price: 10, quantity: 2 }])
    );
  });

  it('should decrease the quantity of an item in the cart', () => {
    const initialCart = [{ id: 1, name: 'Item 1', price: 10, quantity: 2 }];
    localStorage.setItem('cart', JSON.stringify(initialCart));

    const TestComponent = () => {
      const { cart, decreaseQuantity } = useCart();
      return (
        <div>
          <button onClick={() => decreaseQuantity(1)}>Decrease Quantity</button>
          <div data-testid="cart">{JSON.stringify(cart)}</div>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      getByText('Decrease Quantity').click();
    });

    expect(getByTestId('cart').textContent).toContain(
      JSON.stringify([{ id: 1, name: 'Item 1', price: 10, quantity: 1 }])
    );
  });

  it('should remove an item from the cart if quantity reaches 0', () => {
    const initialCart = [{ id: 1, name: 'Item 1', price: 10, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(initialCart));

    const TestComponent = () => {
      const { cart, decreaseQuantity } = useCart();
      return (
        <div>
          <button onClick={() => decreaseQuantity(1)}>Decrease Quantity</button>
          <div data-testid="cart">{JSON.stringify(cart)}</div>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      getByText('Decrease Quantity').click();
    });

    expect(getByTestId('cart').textContent).toBe(JSON.stringify([]));
  });

  it('should calculate the total quantity of items in the cart', () => {
    const initialCart = [
      { id: 1, name: 'Item 1', price: 10, quantity: 2 },
      { id: 2, name: 'Item 2', price: 20, quantity: 3 },
    ];
    localStorage.setItem('cart', JSON.stringify(initialCart));

    const TestComponent = () => {
      const { totalQuantity } = useCart();
      return <div data-testid="total-quantity">{totalQuantity}</div>;
    };

    const { getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(getByTestId('total-quantity').textContent).toBe('5');
  });

  it('should calculate the total cost of items in the cart', () => {
    const initialCart = [
      { id: 1, name: 'Item 1', price: 10, quantity: 2 },
      { id: 2, name: 'Item 2', price: 20, quantity: 3 },
    ];
    localStorage.setItem('cart', JSON.stringify(initialCart));

    const TestComponent = () => {
      const { totalCost } = useCart();
      return <div data-testid="total-cost">{totalCost}</div>;
    };

    const { getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(getByTestId('total-cost').textContent).toBe('80');
  });
});