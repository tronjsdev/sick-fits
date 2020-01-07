import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCartButton = ({ itemId }) => {
  const [addToCart] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      id: itemId,
    },
  });
  return (
    <button type="button" onClick={() => addToCart()}>
      Add To Cart
    </button>
  );
};

export { AddToCartButton };
