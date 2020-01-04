import React from 'react';
import { PaginationStyles } from '@components/styles';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { DisplayError } from '@components';
import Head from 'next/head';
import Link from 'next/link';

import { perPage } from '../../../config/config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = ({ page }: { page: number }) => {
  const { data, loading, error }: any = useQuery(PAGINATION_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  const { count } = data.itemsConnection.aggregate;
  const pages = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits | Page {page}</title>
      </Head>
      <Link
        prefetch
        href={{
          pathname: '/items',
          query: {
            page: page - 1,
          },
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          Prev
        </a>
      </Link>
      <p>
        Page {page || 1} of {pages}
      </p>
      <Link
        prefetch
        href={{
          pathname: '/items',
          query: {
            page: page + 1,
          },
        }}
      >
        <a className="prev next" aria-disabled={page >= pages}>
          Next
        </a>
      </Link>

      <p>{count} Items Total</p>
    </PaginationStyles>
  );
};

export { Pagination };
