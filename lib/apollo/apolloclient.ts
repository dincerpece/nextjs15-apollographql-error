// lib/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL + '/api/na/gql', // GraphQL API URL'si
  cache: new InMemoryCache(),
})

export default client
