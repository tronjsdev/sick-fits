import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '@libs';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCartButton = ({ itemId }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      id: itemId,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button type="button" onClick={() => addToCart()} disabled={loading}>
      Add{loading ? 'ing' : ''} To Cart
    </button>
  );
};

export { AddToCartButton };
