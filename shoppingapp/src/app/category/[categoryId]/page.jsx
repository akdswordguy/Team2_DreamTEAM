"use client"; // For client-side behavior in Next.js

import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { productClient } from "../../utils/apollo-client"; // Apollo Client instance
import { GET_CATEGORY_PRODUCTS } from "../../graphql/categoryQueries"; // Category Products Query
import AuthContext from "../../AuthContext"; // For Authentication Context
import "./style.css"; // Page-specific styles

const CategoryPage = () => {
  const { categoryId } = useParams(); // Dynamic category ID from URL
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext); // Authentication Status

  // States for filtering, pagination, login modal
  const [selectedFilters, setSelectedFilters] = useState({
    color: null,
    size: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showLogin, setShowLogin] = useState(false);

  // Fetch products and category information dynamically using Apollo's useQuery
  const { data, loading, error } = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: {
      id: parseInt(categoryId), // Dynamic category ID
      page: currentPage,
      pageSize: 4, // Products per page
      filters: {
        color: selectedFilters.color,
        size: selectedFilters.size,
      },
    },
    skip: !categoryId, // Do not call the query until a categoryId exists
    client: productClient,
  });

  // Handle Loading State
  if (loading) return <p>Loading...</p>;

  // Handle Errors
  if (error) return <p>Error loading category data: {error.message}</p>;

  // Extract Data
  const category = data?.category || {};
  const products = category?.products?.items || [];
  const totalPages = category?.products?.totalPages || 1;

  // Helper Functions
  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
  };

  const toggleSize = (size) => {
    setSelectedFilters((prev) => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter((s) => s !== size)
        : [...prev.size, size],
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowLogin(true); // Show Login Modal
    } else {
      router.push("/Cart"); // Redirect to Cart Page
    }
  };

  return (
    <div className="shop-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
          <div className="logo">LUXORA</div>
        </div>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/Shop">Shop</Link></li>
          <li><Link href="/Contact">Contact</Link></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button className="search-button">
            <Image src="/maginifying.png" alt="Search" width={18} height={18} />
          </button>
        </div>
        <div className="icons">
          <Link href="/Cart">
            <button className="cart-btn">
              <Image src="/Cart.png" alt="Cart" width={22} height={22} />
            </button>
          </Link>
          <Link href="/profileCreation">
            <button className="profile-btn">
              <Image src="/profile.png" alt="Profile" width={24} height={24} />
            </button>
          </Link>
        </div>
      </nav>

      {/* Banner Section */}
      <div className="banner-container">
        <div className="shop-banner">
          <h2>{category.name}</h2>
          <p>{category.description}</p>
        </div>
      </div>

      {/* Filters and Product Grid Section */}
      <div className="shop-container">
        {/* Sidebar Filters */}
        <div className="sidebar">
          <h2>Filters</h2>

          <div className="filter-section">
            <h4>Color</h4>
            <div className="color-options">
              {["#000000", "#f56042", "#357524", "#731aab"].map((color, index) => (
                <div
                  key={index}
                  className={`color-dot ${selectedFilters.color === color ? "selected" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => toggleFilter("color", color)}
                />
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Size</h4>
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={selectedFilters.size.includes(size) ? "active" : ""}
                onClick={() => toggleSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Products and Pagination */}
        <div className="right-section">
          {/* Product Grid */}
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="image-container">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={350}
                  />
                </div>
                <div className="product-details">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">${product.price}</span>
                </div>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="page-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-number">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="page-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-logo-container">
              <Image src="/company-logo.png" alt="Company Logo" width={35} height={35} />
              <span className="footer-logo">LUXORA</span>
            </div>
          </div>
          <hr />
          <p className="footer-bottom-text">All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;