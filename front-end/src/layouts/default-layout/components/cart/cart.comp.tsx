import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CartStyles, Supreme, CloseButton, SickButton } from '@components/styles';
import { useToggleCart, useUser, calcTotalPrice, formatMoney } from '@libs';


import { CartItem } from './cart-item.comp';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const Cart = () => {
  const { data: local } = useQuery(LOCAL_STATE_QUERY);

  const [toggleCart] = useToggleCart();
  const { data: userData } = useUser();
  if (!userData || !userData.me) {
    return null;
  }
  const { me } = userData;

  return (
    // @ts-ignore
    <CartStyles open={local.cartOpen}>
      <header>
        <CloseButton title="close" onClick={() => toggleCart()}>
          &times;
        </CloseButton>
        <Supreme>Your Cart</Supreme>
        <p>You Have {me.cart.length} Items in your cart.</p>
      </header>
      <ul>
        {userData.me.cart.map(x => (
          <CartItem key={x.id} cartItem={x} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        <SickButton>Checkout</SickButton>
      </footer>
    </CartStyles>
  );
};

export { Cart };
