import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY, styled } from '@libs';

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
    removeFromCart(id: $id) {
      id
    }
  }
`;

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: {
      id,
    },
    optimisticResponse: {
      __typename: 'Mutation',
      removeFromCart: {
        __typename: 'CartItem',
        id,//the return id of the removeFromCart mutation
      },
    },
    update: (cache, payload) => {
      // 1. Read the cache
      const data: any = cache.readQuery({
        query: CURRENT_USER_QUERY,
      });
      console.log(payload);
      console.log(data);
      // 2. remove item from cart
      const cartItemId = payload?.data?.removeFromCart.id;
      console.log('cart before', data.me.cart);
      const cartRemain = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
      console.log('cartRemain', cartRemain);
      // 3. write back to the cache
      cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          ...data,
          me: {
            ...data.me,
            cart: cartRemain,
          },
        },
      });
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
