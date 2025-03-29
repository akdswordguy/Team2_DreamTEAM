import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupPage from './page';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

vi.mock('graphql-tag', () => ({
  __esModule: true,
  default: (strings) => ({
    loc: {
      source: {
        body: strings[0]
      }
    }
  })
}));

describe('SignupPage', () => {
  const mockFormData = {
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    confirmPassword: 'password123'
  };

  const fillForm = async () => {
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { 
      target: { name: 'name', value: mockFormData.name } 
    });
    fireEvent.change(screen.getByPlaceholderText('Username'), { 
      target: { name: 'username', value: mockFormData.username } 
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), { 
      target: { name: 'email', value: mockFormData.email } 
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), { 
      target: { name: 'password', value: mockFormData.password } 
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { 
      target: { name: 'confirmPassword', value: mockFormData.confirmPassword } 
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('renders the signup form correctly', () => {
    render(<SignupPage />);
    
    screen.debug();
    
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
    
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    
    const submitButton = screen.getByRole('button', { name: /create account/i }) || 
                        screen.getByRole('button', { name: /sign up/i }) ||
                        screen.getByRole('button', { name: /register/i });
    expect(submitButton).toBeInTheDocument();
    
    expect(screen.getAllByText(/google|facebook/i).length).toBeGreaterThan(0);
  });

  it('updates form data on input change', async () => {
    render(<SignupPage />);

    const nameInput = screen.getByPlaceholderText('Full Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(nameInput, { target: { name: 'name', value: mockFormData.name } });
    fireEvent.change(emailInput, { target: { name: 'email', value: mockFormData.email } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: mockFormData.password } });

    expect(nameInput.value).toBe(mockFormData.name);
    expect(emailInput.value).toBe(mockFormData.email);
    expect(passwordInput.value).toBe(mockFormData.password);
  });

  it('shows error when passwords do not match', async () => {
    render(<SignupPage />);

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { 
      target: { name: 'name', value: mockFormData.name } 
    });
    fireEvent.change(screen.getByPlaceholderText('Username'), { 
      target: { name: 'username', value: mockFormData.username } 
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), { 
      target: { name: 'email', value: mockFormData.email } 
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), { 
      target: { name: 'password', value: 'password123' } 
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { 
      target: { name: 'confirmPassword', value: 'differentpassword' } 
    });

    const submitButton = screen.getByRole('button', { name: /create account|sign up|register/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const mockResponse = {
      data: {
        register: {
          message: 'Registration successful!',
          success: true
        }
      }
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    render(<SignupPage />);
    
    await fillForm();

    const submitButton = screen.getByRole('button', { name: /create account|sign up|register/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/auth_app/graphql/',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: expect.stringContaining(mockFormData.username)
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
    });
  });

  it('shows error when registration fails', async () => {
    const mockResponse = {
      data: {
        register: {
          message: 'Username already exists',
          success: false
        }
      }
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    render(<SignupPage />);
    
    await fillForm();

    const submitButton = screen.getByRole('button', { name: /create account|sign up|register/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElement = screen.getByText(/username already exists/i) || 
                          screen.getByText(/error/i) ||
                          screen.getByRole('alert');
      expect(errorElement).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    global.fetch.mockImplementationOnce(() => 
      new Promise((resolve) => setTimeout(() => resolve({ 
        ok: true,
        json: () => Promise.resolve({ 
          data: { register: { message: 'Success', success: true } }
        })
      }), 100))
    );

    render(<SignupPage />);
    
    await fillForm();

    const submitButton = screen.getByRole('button', { name: /create account|sign up|register/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/signing up|loading|processing/i)).toBeInTheDocument();
  });

  it('shows error when network request fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<SignupPage />);
    
    await fillForm();

    const submitButton = screen.getByRole('button', { name: /create account|sign up|register/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElement = screen.getByText(/signup failed|network error|failed|error/i) ||
                          screen.getByRole('alert');
      expect(errorElement).toBeInTheDocument();
    });
  });
});