import React from 'react';
import { AppPage } from 'next';
import { withApollo } from '@libs';

import { SingleItem } from './single-item.comp';

const Page: AppPage = ({ query: { id } }:any) => {
  return (
    <>
      <SingleItem id={id} />
    </>
  );
};

const ItemPage = withApollo(Page);
export { ItemPage };
