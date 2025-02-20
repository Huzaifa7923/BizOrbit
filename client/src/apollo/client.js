import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const httpLink = createUploadLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include', // Include cookies in requests
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
