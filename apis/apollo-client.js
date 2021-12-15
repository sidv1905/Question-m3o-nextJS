import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri: "https://api.m3o.com/v1/answer",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    "Content-Type": "application/json",
  },
  // other link options...
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
  // other options...
});

export default client;
