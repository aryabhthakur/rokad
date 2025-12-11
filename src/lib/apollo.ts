// lib/apollo-strapi.ts
import { ApolloClient, HttpLink, InMemoryCache, } from '@apollo/client';
import fetch from 'cross-fetch';
let globalApolloClient: ApolloClient | null = null;

export function createApolloClient(authToken?: string) {
    const token = authToken ?? process.env.STRAPI_READONLY_TOKEN ?? process.env.NEXT_PUBLIC_STRAPI_READONLY_TOKEN;
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: process.env.STRAPI_GRAPHQL_URL || 'http://localhost:1338/graphql',
            fetch,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        }),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        industries: { merge: true },
                        solutions: { merge: true },
                        insights: { merge: true },
                        'case-studies': { merge: true },
                    },
                },
            },
        }),
    }) as ApolloClient;
}

export function getApolloClient(authToken?: string) {
    // For server: always create a new client to avoid sharing cache between requests.
    if (typeof window === 'undefined') {
        return createApolloClient(authToken);
    }
    // For client: reuse the same instance.
    if (!globalApolloClient) {
        globalApolloClient = createApolloClient(authToken);
    }
    return globalApolloClient;
}
