import React from 'react';
import { AppPage } from 'next';
import {Items} from "@components";
import {withApollo} from "@libs";

const IndexPage: AppPage = () => {
  return (
    <>
      <Items></Items>
    </>
  );
};

IndexPage.getInitialProps = async ({ req }) => {
  return {};
};

export default withApollo(IndexPage);
