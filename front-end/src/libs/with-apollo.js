import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import gql from 'graphql-tag';

import { endpoint } from '../config/config';

let globalApolloClient = null;
let headers = null;

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
  const cache = new InMemoryCache().restore(initialState);
  cache.writeData({
    data: {
      cartOpen: false,
    },
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint, // Server URL (must be absolute)
      //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Sending_a_request_with_credentials_included
      //https://javascript.info/fetch-crossorigin#credentials
      //credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      // `include`: to tell the browser to include credentials (e.g: cookies) on every request to ALL sites
      // and server should setting cors to support the response header like this:
      // Access-Control-Allow-Credentials: true
      // Access-Control-Allow-Origin: http://localhost:7777
      credentials: 'include',
      fetch,
      fetchOptions: {
        credentials: 'include',
      },
      headers,
    }),
    cache,
    resolvers: {
      Mutation: {
        // eslint-disable-next-line no-shadow
        toggleCart: (_root, variables, { cache, getCacheKey }) => {
          const query = gql`
            {
              cartOpen @client
            }
          `;
          const { cartOpen } = cache.readQuery({ query });
          cache.writeQuery({ query, data: { cartOpen: !cartOpen } });
          //cache.writeData({ data: { cartOpen: !previous } });
        },
      },
    },
  });
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState);
  }

  return globalApolloClient;
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
  // eslint-disable-next-line no-shadow
  const WithApollo = ({ apolloClient, apolloState, Layout, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <Layout>
          <PageComponent {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree, query } = ctx;
      headers = ctx.req ? ctx.req.headers : null;
      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      // eslint-disable-next-line no-multi-assign
      const apolloClient = (ctx.apolloClient = initApolloClient());

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return {...pageProps};
        }

        // Only if ssr is enabled
        if (ssr) {
          debugger;
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                  query,
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
        query,
      };
    };
  }

  return WithApollo;
}
