import React from 'react';
import Link from 'next/link';
import { NavStyles } from '@components/styles';
import { useToggleCart, useUser } from '@libs';
import { Signout } from '@components';
import { CartCount } from '@components/site/cart';

const Nav = () => {
  const { data }: any = useUser();
  const { me } = data || {};
  //const me = {};
  const [toggleCart] = useToggleCart();
  return (
    <NavStyles>
      <Link href="/items">
        <a>Shop</a>
      </Link>

      {me && (
        <>
          <Link href="/sell">
            <a>Sell</a>
          </Link>

          <Link href="/orders">
            <a>Orders</a>
          </Link>

          <Link href="/me">
            <a>Account</a>
          </Link>

          <button type="button" onClick={() => toggleCart()}>
            My Cart
            <CartCount
              count={me.cart.reduce((accumulator, currentCartItem) => {
                return parseInt(accumulator, 10) + parseInt(currentCartItem.quantity, 10);
              }, 0)}
            />
          </button>

          <Signout />
        </>
      )}
      {!me && (
        <Link href="/signup">
          <a>Sign In</a>
        </Link>
      )}
    </NavStyles>
  );
};

export { Nav };
