import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { DisplayError } from '@components';
import { styled } from '@libs';
import Head from 'next/head';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

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

const SingleItem = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  if (!data || !data.item) {
    return <p>No item found for {id}</p>;
  }
  const { item } = data;
  return (
    <SingleItemStyles>
      <Head>
        <title>Sick Fits | {item.title}</title>
      </Head>
      <img src={item.largeImage} alt={item.title} />
      <div className="details">
        <h2>Viewing {item.title}</h2>
        <p>{item.description}</p>
      </div>
    </SingleItemStyles>
  );
};

export { SingleItem };
