import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_URL = "https://team2-dreamteam.onrender.com/graphql/";

export const graphqlClient = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});
