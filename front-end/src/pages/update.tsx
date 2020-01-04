import React from 'react';
import { AppPage } from 'next';
import { UpdateItem } from '@components';
import { withApollo } from '@libs';

// eslint-disable-next-line react/display-name
const UpdateItemPage: AppPage<any> = ({ query }) => {
  return (
    <div>
      <UpdateItem id={query.id} />
    </div>
  );
};

UpdateItemPage.getInitialProps = async ({ query }) => {
  return { query, title: 'Update Item' };
};

export default withApollo(UpdateItemPage);
