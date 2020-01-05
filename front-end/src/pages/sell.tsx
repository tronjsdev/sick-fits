import React from 'react';
import { CreateItem } from '@components';
import { withApollo } from '@libs';

// eslint-disable-next-line react/display-name
const SellPage = props => {
  return (
    <div>
      <CreateItem />
    </div>
  );
};

export default withApollo(SellPage);
