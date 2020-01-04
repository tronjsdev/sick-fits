import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { styled } from '@libs';
import { Item } from '@src/components';
import { Pagination } from '@src/pages/items/components/pagination.comp';

import { perPage } from '../../../config/config';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int=${perPage}) {
    items(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const Items = ({ page }) => {
  return (
    <Center>
      <Pagination page={page} />
      <Query
        query={ALL_ITEMS_QUERY}
        variables={{
          skip: perPage * (page - 1),
          first: perPage,
        }}
      >
        {({ data, error, loading }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return (
              <p>
                Error:
                {error.message}
              </p>
            );
          }
          return (
            <ItemList>
              {data.items.map(item => (
                <Item key={item.id} item={item} />
              ))}
            </ItemList>
          );
        }}
      </Query>
      <Pagination page={page} />
    </Center>
  );
};

export { Items, ALL_ITEMS_QUERY };