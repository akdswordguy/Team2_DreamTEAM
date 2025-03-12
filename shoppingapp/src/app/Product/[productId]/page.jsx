"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { productClient } from "../../utils/apollo-client";
import { GET_PRODUCT_DETAILS } from "../../graphql/productQueries";
import "./styles.css";

const ProductPage = () => {
  const { productId } = useParams();
  const { addItem } = useCart();

  // Apollo Client Query to fetch product details by ID
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id: parseInt(productId) },
    skip: !productId,
    client: productClient,
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
    imageUrl = "/default-product.jpg",
  } = product;

  return (
    <div className="product-page">
      {/* Back Button */}
      <div className="back-button">
        <Link href={`/category/${category.id}`}>
          <button className="back-btn"> Back to {category.name || "Products"}</button>
        </Link>
      </div>

      {/* Product Section */}
      <div className="product-container">
        {/* Left Section: Product Name */}
        <div className="product-name-section">
          <h1 className="product-title">{name}</h1>
        </div>

        {/* Center Section: Product Image */}
        <div className="product-image-container">
          <Image
            src={imageUrl}
            alt={name}
            width={500}
            height={600}
            className="product-detail-image"
          />
        </div>

        {/* Right Section: Product Details */}
        <div className="product-details">
          <p className="product-description">{description}</p>
          <span className="product-price">${price}</span>
          <button
            className="add-to-cart-btn"
            onClick={() => addItem(product)}
          >
            Add to Cart
          </button>
          {/* Size Selection Buttons */}
          <div className="size-buttons">
            <button className="size-btn">S</button>
            <button className="size-btn">M</button>
            <button className="size-btn">L</button>
            <button className="size-btn">XL</button>
          </div>
        </div>
      </div>

      {/* Bottom Design Effects */}
      <div className="design-effects">
        <div className="effect-circle"></div>
        <div className="effect-rectangle"></div>
        <div className="effect-semi-circle"></div>
      </div>
    </div>
  );
};

export default ProductPage;