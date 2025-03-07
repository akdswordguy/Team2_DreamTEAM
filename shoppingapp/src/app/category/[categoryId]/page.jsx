"use client"; // Declare as a client component at the top of the file

import { useParams } from "next/navigation"; // Use next/navigation for App Router
import { useQuery } from "@apollo/client"; // For GraphQL queries
import { productClient } from "../../utils/apollo-client";
import { GET_CATEGORY_PRODUCTS } from "../../graphql/categoryQueries"; // Your GraphQL query

const CategoryPage = () => {
  const { categoryId } = useParams(); // Extract categoryId from the URL

  // GraphQL query execution
  const { data, loading, error } = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: { id: parseInt(categoryId) },
    skip: !categoryId, // Skip query if categoryId is unavailable
    client: productClient,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading category data: {error.message}</p>;

  return (
    <div>
      <h1>Category: {data?.category?.name}</h1>
      <p>{data?.category?.description}</p>
      <h2>Products:</h2>
      <ul>
        {data?.category?.products?.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
