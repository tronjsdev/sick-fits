import React from 'react';
import Link from 'next/link';
import NavStyles from '@src/components/styles/NavStyles';
import { useUser } from '@src/libs/hooks';
import { Signout } from '@components';

const Nav = () => {
  const user = useUser();
  return (
    <NavStyles>
      <Link href="/items">
        <a>Shop</a>
      </Link>

      {user && (
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

          <Signout />
        </>
      )}
      {!user && (
        <Link href="/signup">
          <a>Sign In</a>
        </Link>
      )}
    </NavStyles>
  );
};

export { Nav };
