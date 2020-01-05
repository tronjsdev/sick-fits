import React from 'react';
import Link from 'next/link';
import NavStyles from '@src/components/styles/NavStyles';
import { User } from '@components';

const Nav = () => (
  <NavStyles>
    <User>
      {({ data }) => {
        if (data && data.me?.name) {
          return <p>{data.me.name}</p>;
        }
        return null;
      }}
    </User>
    <Link href="/items">
      <a>Shop</a>
    </Link>

    <Link href="/sell">
      <a>Sell</a>
    </Link>

    <Link href="/signup">
      <a>Signup</a>
    </Link>

    <Link href="/orders">
      <a>Orders</a>
    </Link>

    <Link href="/me">
      <a>Account</a>
    </Link>
  </NavStyles>
);

export { Nav };
