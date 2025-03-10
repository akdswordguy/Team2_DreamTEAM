"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation"; // Extract `categoryId` from the URL
import { useQuery } from "@apollo/client"; // Apollo client for GraphQL queries
import Image from "next/image";
import Link from "next/link";

import { productClient } from "../../utils/apollo-client"; // Apollo client instance
import { GET_CATEGORY_PRODUCTS } from "../../graphql/categoryQueries"; // GraphQL query for category products
import "./style.css"; // Assuming shared styles for Category Page

const CategoryPage = () => {
  const { categoryId } = useParams(); // Extract `categoryId` from the URL
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const productsPerPage = 21; // Number of products per page

  // Apollo Client Query
  const { data, loading, error } = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: { id: parseInt(categoryId) }, // Pass categoryId dynamically
    skip: !categoryId, // Skip query if categoryId is not available
    client: productClient, // Use custom Apollo client
  });

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading category data: {error.message}</p>;

  // Extract data
  const category = data?.category || {};
  const { products = [] } = category;

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Get products for the current page
  const displayedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="category-page">
      {/* Category Header */}
      <header className="category-header">
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </header>

      {/* Product Grid */}
      <div className="product-grid">
        {displayedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              {/* Product Image */}
              <Image
                src={product.imageUrl || "/default-product.jpg"} // Fallback to default image
                alt={product.name}
                width={300}
                height={350}
                className="product-image"
              />
            </div>
            <div className="product-details">
              <span className="product-name">{product.name}</span>
              <span className="product-price">${product.price}</span>
            </div>
            <button className="add-to-cart-btn">Add to Cart</button>
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

      {/* Explore More Categories */}
      <div className="other-categories">
        <h3>Explore More Categories</h3>
        <Link href="/">Back to All Categories</Link>
      </div>
    </div>
  );
};

export default CategoryPage;