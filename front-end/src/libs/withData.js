import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';

import { endpoint } from '../config/config';

function createClient({ headers }) {
  // apollo-boost vs apollo-client?
  // https://www.apollographql.com/docs/react/migrating/boost-migration/
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
