import { ApolloClient, InMemoryCache } from "@apollo/client";

// GraphQL endpoint for authentication
export const authClient = new ApolloClient({
  uri: "http://127.0.0.1:8000/auth_app/graphql/",
  cache: new InMemoryCache(),
});

// GraphQL endpoint for products
export const productClient = new ApolloClient({
  uri: "http://127.0.0.1:8000/product/graphql/",
  cache: new InMemoryCache(),
});
