import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from '@src/pages/items/components/items.comp';
import { perPage } from '@src/config/config';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem = ({ children, id, page }: any) => {
  const [deleteItem, { loading, data, error }] = useMutation(DELETE_ITEM_MUTATION, {
    variables: { id },
    //The magic thing is here :D
    optimisticResponse: {
      __typename: 'Mutation',
      deleteItem: {
        id,
        __typename: 'Item',
      },
    },
    // Manually update the cache on the client so it matches the server
    // https://www.apollographql.com/docs/react/performance/optimistic-ui/#basic-optimistic-ui

    update: (proxy, { data: { deleteItem: deletedItem } }: any) => {
      debugger;
      const queryAndVars = {
        query: ALL_ITEMS_QUERY,
        variables: {
          skip: 4 * (page - 1),
          first: 4,
        },
      };
      // Read the data from our cache for this query.
      const dataCached: any = proxy.readQuery({
        ...queryAndVars,
      });
      console.log('dataCached', dataCached, deletedItem);
      // Write our data back to the cache with the new comment in it
      const items = dataCached.items.filter(x => x.id !== deletedItem.id);
      console.log('dataCached after', dataCached, deletedItem);
      proxy.writeQuery({
        ...queryAndVars,
        data: {
          ...dataCached,
          items,
        },
      });
      console.log('Cache have done writing');
    },
    /*refetchQueries: args => [{
      query: ALL_ITEMS_QUERY
    }],
    awaitRefetchQueries: true,*/
    onCompleted: data1 => {
      console.log('onCompleted triggered');
    },
  });
  const handleDeleteItem = React.useCallback(
    async e => {
      if (window.confirm('Are your sure?')) {
        await deleteItem();
      }
    },
    [deleteItem]
  );
  return (
    <button type="button" onClick={handleDeleteItem}>
      {children}
    </button>
  );
};

export { DeleteItem };
