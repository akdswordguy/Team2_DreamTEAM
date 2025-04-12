import { ApolloClient, InMemoryCache } from "@apollo/client";

const BASE_API = process.env.NEXT_PUBLIC_API_BASE;

export const authClient = new ApolloClient({
  uri: "https://luxora-backend-2ep1.onrender.com/auth_app/",
  cache: new InMemoryCache(),
});

export const productClient = new ApolloClient({
  uri: "https://luxora-backend-2ep1.onrender.com/product/",
  cache: new InMemoryCache(),
});
