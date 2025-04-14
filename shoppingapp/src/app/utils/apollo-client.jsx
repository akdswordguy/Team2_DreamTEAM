import { ApolloClient, InMemoryCache } from "@apollo/client";

export const authClient = new ApolloClient({
  uri: `https://team2-dreamteam.onrender.com/auth_app/graphql/`,
  cache: new InMemoryCache(),
});

export const productClient = new ApolloClient({
  uri: `https://team2-dreamteam.onrender.com/product/graphql/`,
  cache: new InMemoryCache(),
});
