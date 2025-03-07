import { gql } from "@apollo/client";

export const GET_CATEGORY_PRODUCTS = gql`
  query GetCategoryProducts($id: Int!) {
    category(id: $id) {
      id
      name
      description
      products {
        id
        name
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    allCategories {
      id
      name
      description
      products {
        id
        name
        price
        stock
      }
    }
  }
`;
