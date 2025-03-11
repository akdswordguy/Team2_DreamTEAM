"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { productClient } from "../utils/apollo-client";
import { GET_ALL_CATEGORIES } from "../graphql/categoryQueries";
import Link from "next/link";
import Image from "next/image";
import "./CategoryList.css";

const CategoryList = () => {
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES, {
    client: productClient,
  });

  if (loading) return <p className="loading-text">Loading categories...</p>;
  if (error)
    return (
      <p className="error-text">Error fetching categories: {error.message}</p>
    );

  const categories = data?.allCategories;

  return (
    <section className="categories">
      <h3 className="section-title">Browse Categories</h3>
      <div className="categories-scroll-container">
        <div className="categories-container">
          {categories.map((category) => {
            // Select a random product image from the category
            const products = category.products || [];
            const randomProduct =
              products.length > 0
                ? products[Math.floor(Math.random() * products.length)]
                : null;

            return (
              <div key={category.id} className="category-card">
                <Image
                  src={
                    randomProduct ? randomProduct.imageUrl : "/placeholder.jpg"
                  } // Random product image or fallback
                  alt={category.name}
                  width={270}
                  height={325}
                  className="category-img"
                />
                <h4>{category.name}</h4>
                <Link href={`/category/${category.id}`}>
                  <button className="btn view-category-btn">
                    View Products
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
