import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      totalAmount
      status
      createdAt
      orderItems {
        product {
          name
        }
        quantity
      }
    }
  }
`;
