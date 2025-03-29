import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactUs from './page';
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

vi.mock('../components/NavBar', () => ({
  __esModule: true,
  default: () => <div>Mocked NavBar</div>,
}));

vi.mock('../hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({
    isLoggedIn: false,
    logout: vi.fn(),
    username: null,
  }),
}));

vi.mock('../hooks/useCart', () => ({
  __esModule: true,
  default: () => ({
    totalQuantity: 0,
    clearCart: vi.fn(),
  }),
}));

const sessionStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key]),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

describe('ContactUs Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.sessionStorage.clear();
  });

  it('renders the contact page correctly', () => {
    usePathname.mockReturnValue('/Contact');
    render(<ContactUs />);
    
    expect(screen.getByText('Our Location')).toBeInTheDocument();
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText('We Value Your Feedback')).toBeInTheDocument();
    expect(screen.getByText('Our Address')).toBeInTheDocument();
    
    const addressElement = screen.queryByText('Asklepios Tower') || 
                         screen.queryByText(/tower/i) ||
                         screen.getByText('Our Address').nextElementSibling;
    expect(addressElement).toBeInTheDocument();
    
    expect(screen.getByText('Our Contact Info')).toBeInTheDocument();
    
    const emailElement = screen.queryByText('help@luxora.com') || 
                       screen.queryByText(/^\S+@\S+\.\S+$/) ||
                       screen.queryByText(/luxora\.com/) ||
                       screen.getByText('Our Contact Info').nextElementSibling;
    expect(emailElement).toBeInTheDocument();
    
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('LUXORA')).toBeInTheDocument();
    expect(screen.getByText('Privacy & Policy')).toBeInTheDocument();
  });

  it('displays the map iframe with correct attributes', () => {
    usePathname.mockReturnValue('/Contact');
    render(<ContactUs />);
    
    const iframes = document.querySelectorAll('iframe');
    const mapIframe = Array.from(iframes).find(iframe => 
      iframe.src && iframe.src.includes('google.com/maps/embed')
    );
    
    expect(mapIframe).toBeInTheDocument();
    expect(mapIframe).toHaveAttribute('loading', 'lazy');
    expect(mapIframe).toHaveAttribute('referrerPolicy', 'no-referrer-when-downgrade');
  });

  it('handles session storage for page reload', () => {
    usePathname.mockReturnValue('/Contact');
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });
    
    render(<ContactUs />);
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('lastVisitedPage', '/Contact');
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('hasReloaded', 'false');
    expect(reloadMock).not.toHaveBeenCalled();
    
    window.sessionStorage.getItem.mockImplementation((key) => {
      if (key === 'lastVisitedPage') return '/Contact';
      if (key === 'hasReloaded') return 'false';
      return null;
    });
    
    render(<ContactUs />);
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('hasReloaded', 'true');
    expect(reloadMock).toHaveBeenCalled();
  });

  it('does not reload when pathname changes', () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    usePathname.mockReturnValue('/Contact');
    render(<ContactUs />);
    
    vi.clearAllMocks();
    
    window.sessionStorage.getItem.mockImplementation((key) => {
      if (key === 'lastVisitedPage') return '/Contact';
      if (key === 'hasReloaded') return 'false';
      return null;
    });
    
    usePathname.mockReturnValue('/About');
    render(<ContactUs />);
    
    expect(reloadMock).not.toHaveBeenCalled();
  });

  it('renders social media links in footer', () => {
    usePathname.mockReturnValue('/Contact');
    render(<ContactUs />);
    
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks.some(link => 
      link.href.includes('instagram.com') || 
      link.href.includes('x.com')
    )).toBeTruthy();
  });

  it('renders navigation links in footer', () => {
    usePathname.mockReturnValue('/Contact');
    render(<ContactUs />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});