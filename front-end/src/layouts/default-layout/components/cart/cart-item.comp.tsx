import React from 'react';
import { formatMoney, styled } from '@libs';

import { RemoveFromCart } from './remove-from-cart.comp';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: solid 1px #ccc;
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    max-height: 64px;
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  if (!cartItem.item) {
    return (
      <CartItemStyles>
        This item has been removed
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );
  }
  return (
    <CartItemStyles>
      <img src={cartItem.item.image} alt={cartItem.item.title} />
      <div className="cart-item-details">
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price)}
          {' - '}
          <em>
            {cartItem.quantity} x {formatMoney(cartItem.item.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

export { CartItem };
