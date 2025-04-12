import { ApolloClient, InMemoryCache } from "@apollo/client";

const BASE_API = process.env.NEXT_PUBLIC_API_BASE;

export const authClient = new ApolloClient({
  uri: `${BASE_API}/auth_app/`,
  cache: new InMemoryCache(),
});

export const productClient = new ApolloClient({
  uri: `${BASE_API}/product/`,
  cache: new InMemoryCache(),
});
