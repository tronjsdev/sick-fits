import React from 'react';
import { AppPage } from 'next';
import { withApollo } from '@libs';

import { Items } from './items.comp';

const Page: AppPage = ({ query: { page } }: any) => {
  return (
    <>
      <Items page={parseFloat(page) || 1} />
    </>
  );
};

Page.getInitialProps = async ({ req }) => {
  return {};
};

const ItemsPage = withApollo(Page);
export { ItemsPage };
