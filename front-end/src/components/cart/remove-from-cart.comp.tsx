import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { styled } from '@libs';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id:$id) {
      id
    }
  }
`;

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: {
      id,
    },
  });
  return (
    <BigButton
      title="Delete item"
      onClick={e => removeFromCart().catch(err => alert(err.message))}
      disabled={loading}
    >
      &times;
    </BigButton>
  );
};

export { RemoveFromCart };
