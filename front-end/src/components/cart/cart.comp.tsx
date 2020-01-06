import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CartStyles, Supreme, CloseButton, SickButton } from '@components/styles';
import { useToggleCart } from '@libs';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const Cart = () => {
  const {
    data: { cartOpen },
  }: any = useQuery(LOCAL_STATE_QUERY);

  const [toggleCart] = useToggleCart();

  return (
    // @ts-ignore
    <CartStyles open={cartOpen}>
      <header>
        <CloseButton title="close" onClick={()=>toggleCart()}>
          &times;
        </CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You Have __ Items in your cart.</p>
      </header>

      <footer>
        <p>$10.10</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </CartStyles>
  );
};

export { Cart };
