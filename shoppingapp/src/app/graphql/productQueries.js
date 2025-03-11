import { gql } from "@apollo/client";

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($id: Int!) {
    product(id: $id) {
      id
      name
      description
      price
      imageUrl
      category {
        id
        name
      }
    }
  }
`;