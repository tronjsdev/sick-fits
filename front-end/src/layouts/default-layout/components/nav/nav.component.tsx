import React from 'react';
import Link from 'next/link';
import NavStyles from '@src/components/styles/NavStyles';
import { useToggleCart, useUser } from '@libs';
import { Signout } from '@components';

const Nav = () => {
  const { data }: any = useUser();
  const [toggleCart] = useToggleCart();
  const { me } = data || {};
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
          
          <button type="button" onClick={()=>toggleCart()}>
            My Cart
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
