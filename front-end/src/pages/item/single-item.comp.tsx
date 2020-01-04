import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from "@apollo/react-hooks";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

const SingleItem = ({id}) => {
  return <div>{id}</div>;
};

export { SingleItem };
