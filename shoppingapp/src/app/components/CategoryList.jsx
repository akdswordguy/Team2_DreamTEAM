"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { productClient } from "../utils/apollo-client";
import { GET_ALL_CATEGORIES } from "../graphql/categoryQueries";

const CategoryList = () => {
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES, {
    client: productClient,
  });

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error fetching categories: {error.message}</p>;

  const categories = data?.allCategories;

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <div key={category.id} className="category-card">
          <h4>{category.name}</h4>
          <p>{category.description}</p>
          <a href={`/category/${category.id}`} className="view-category-btn">
            View Products
          </a>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
