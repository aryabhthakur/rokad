// lib/apollo-server.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

export function getServerApollo() {
    return new ApolloClient({
        ssrMode: true,
        link: new HttpLink({
            uri: process.env.STRAPI_GRAPHQL_URL || 'http://localhost:1338/graphql',
            fetch,
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_READONLY_TOKEN}`,
            },
        }),
        cache: new InMemoryCache(),
    });
}
