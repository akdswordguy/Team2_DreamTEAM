"use client";

import React from "react";
import { useParams } from "next/navigation"; // Extract `productId` from the URL
import { useQuery } from "@apollo/client"; // Apollo client for GraphQL queries
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext"; // Cart context to add items to the cart
import { productClient } from "../../utils/apollo-client"; // Apollo Client instance
import { GET_PRODUCT_DETAILS } from "../../graphql/productQueries"; // GraphQL query for product details
import "./styles.css";

const ProductPage = () => {
  const { productId } = useParams(); // Extract the product ID from the URL
  const { addItem } = useCart(); // Access the `addItem` function to allow adding products to the cart

  // Apollo Client Query to fetch product details by ID
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id: parseInt(productId) }, // Pass productId dynamically
    skip: !productId, // Skip query if productId is missing
    client: productClient, // Use custom Apollo client instance
  });

  // Handle loading and error states
  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>Error loading product: {error.message}</p>;

  // Extract product and category details from the query response
  const product = data?.product || {};
  const category = product?.category || {};

  // Destructure product fields
  const {
    name = "Unknown Product",
    description = "No description available.",
    price = "N/A",
    imageUrl = "/default-product.jpg", // Fallback to default image
  } = product;

  return (
    <div className="product-page">
      {/* Back to Category/Product Grid */}
      <div className="back-link">
        {/* Link back to the category page with the category ID */}
        <Link href={`/category/${category.id}`}>
          ← Back to {category.name || "Products"}
        </Link>
      </div>

      {/* Product Section */}
      <div className="product-details-container">
        {/* Product Image */}
        <div className="product-image-container">
          <Image
            src={imageUrl}
            alt={name}
            width={500}
            height={600}
            className="product-detail-image"
          />
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h1 className="product-name">{name}</h1>
          <p className="product-description">{description}</p>
          <span className="product-price">${price}</span>

          {/* Add to Cart */}
          <button
            className="add-to-cart-btn"
            onClick={() => addItem(product)} // Add product to cart
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
