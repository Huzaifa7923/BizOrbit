import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include', // Include cookies in requests
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
