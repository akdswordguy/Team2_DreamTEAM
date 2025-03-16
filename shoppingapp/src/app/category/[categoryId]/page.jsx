"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { useCart } from "../../context/CartContext"; // Cart Context API
import Image from "next/image";
import Link from "next/link";

import { productClient } from "../../utils/apollo-client";
import { GET_CATEGORY_PRODUCTS } from "../../graphql/categoryQueries";
import "./style.css";

const CategoryPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: null,
    color: null,
    size: [],
  });
  const { categoryId } = useParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const { addItem } = useCart(); // Add product to cart function
  // Toggle category filter and update URL
  const toggleFilter = (type, value, id) => {
    const newCategory = selectedFilters[type] === value ? null : value;
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: newCategory,
    }));
    setCurrentPage(1); // Reset to first page when filter changes

    // Update URL based on selected category ID
    if (newCategory) {
      router.push(`/category/${id}`);
    } else if (categoryId) {
      router.push(`/category/${categoryId}`); // Revert to original category if filter removed
    }
  };

  // Toggle size filter
  const toggleSize = (size) => {
    setSelectedFilters((prev) => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter((s) => s !== size)
        : [...prev.size, size],
    }));
    setCurrentPage(1);
  };

  // Apollo Client Query
  const { data, loading, error } = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: { id: parseInt(categoryId) },
    skip: !categoryId,
    client: productClient,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading category data: {error.message}</p>;

  const category = data?.category || {};
  const { products = [] } = category;

  // Filter products based on selected category name
  const filteredProducts = products.filter((product) => {
    if (!selectedFilters.category) return true;
    return (
      product.category?.toLowerCase() === selectedFilters.category.toLowerCase()
    );
  });

  if (!category || !products.length) {
    return <p>No products found for this category.</p>;
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const getRandomRating = () => {
    const starsCount = Math.floor(Math.random() * 3) + 3; // 1 to 5 stars
    const reviewsCount = Math.floor(Math.random() * 46) + 5; // 5 to 50 reviews
    const stars = "★".repeat(starsCount) + "☆".repeat(5 - starsCount); // Full and empty stars
    return { stars, reviewsCount };
  };

  return (
    <div className="category-page">
     
      <div className="banner-container">
        <div className="all-products">
          <Link href="#">All Products </Link>
        </div>
        <div className="shop-banner">
          <h2>
            20% OFF ONLY TODAY AND <br /> EARN SPECIAL REWARDS!
          </h2>
          <p>
            Shop now for 20% off on our exclusive collection. <br /> Earn extra
            rewards by joining as a member.
          </p>
        </div>
      </div>

      <div className="shop-container">
        <div className="sidebar">
          <h2>Filters</h2>
          <div className="filter-section">
            <h4>Category</h4>
            {[
              { id: 23, name: "LINEN" },
              { id: 24, name: "OVERSHIRTS" },
              { id: 25, name: "SHIRTS" },
              { id: 26, name: "T-SHIRTS" },
              { id: 27, name: "HOODIES_SWEATSHIRTS" },
              { id: 29, name: "TROUSERS" },
              { id: 28, name: "POLO_SHIRTS" },
            ].map(({ id, name }) => (
              <button
                key={id}
                className={`filter-button ${
                  selectedFilters.category === name ? "active" : ""
                }`}
                onClick={() => toggleFilter("category", name, id)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="right-section">
          <div className="product-grid">
            {displayedProducts.map((product) => {
              const { stars, reviewsCount } = getRandomRating(); // Generate random rating per product
              return (
                <div key={product.id} className="product-card">
                  <div className="image-container">
                  <Link href={`/Product/${product.id}`}>
                    <Image
                      src={product.imageUrl || "/default-product.jpg"}
                      alt={product.name}
                      width={300}
                      height={350}
                      style={{ objectFit: "cover" }}
                      className="product-image"
                    />
                    </Link>
                  </div>
                  <div className="product-details">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">${product.price}</span>
                    <div className="product-rating">
                      <span className="stars">{stars}</span>
                      <span>({reviewsCount})</span>
                    </div>
                  </div>
                  <button
                      className="add-to-cart-btn"
                      onClick={() => addItem(product)} // Add product to cart
                      >
                      Add to Cart
                  </button>
                </div>
              );
            })}
          </div>

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

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-logo-container">
              <Image
                src="/company-logo.png"
                alt="Company Logo"
                width={35}
                height={35}
              />
              <span className="footer-logo">LUXORA</span>
            </div>
            <p className="footer-address">
              Address of the Company
              <br />
              P.O. Box
            </p>
          </div>

          <ul className="footer-links">
            <li>
              <Link href="./">Home</Link>
            </li>
            <li>
              <Link href="#">Shop</Link>
            </li>
            <li>
              <Link href="./Contact">Contact</Link>
            </li>
          </ul>

          <div className="footer-right">
            <Link href="#">
              <Image src="/phone.png" alt="Phone" width={30} height={22} />
            </Link>
            <Link href="https://x.com/luxora_inc?lang=en">
              <Image src="/X.png" alt="X" width={22} height={22} />
            </Link>
            <Link href="https://www.instagram.com/luxoraofficial/?hl=en">
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={22}
                height={22}
              />
            </Link>
          </div>
        </div>

        <div className="privacy-policy">
          <Link href="#">Privacy & Policy</Link>
        </div>

        <hr className="footer-divider" />
        <p className="footer-bottom-text">All rights reserved</p>
      </footer>
    </div>
  );
};

export default CategoryPage;
