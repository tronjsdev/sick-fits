import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { DisplayError } from '@components';
import gql from 'graphql-tag';

import Form from '../styles/Form';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`;

const UpdateItem = ({ id }) => {
  const [statex, setStatex] = React.useState({});
  const { loading, error, data, networkStatus, ...rest } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
    ssr: typeof window === 'undefined',
  });
  console.log('SINGLE_ITEM_QUERY', {...rest, networkStatus});

  const [
    updateItem,
    { loading: updating, error: errorMutation, data: dataMutation, ...restMutation },
  ] = useMutation(UPDATE_ITEM_MUTATION, {
    variables: statex,
    onCompleted: data1 => {
      console.log(`UPDATE_ITEM_MUTATION completed`, data1);
    },
  });

  const handleChange = React.useCallback(
    e => {
      const { name, type, value } = e.target;
      const val = type === 'number' ? parseFloat(value) : value;
      setStatex({
        ...statex,
        [name]: val,
      });
    },
    [statex]
  );

  const handleSubmitUpdateItem = React.useCallback(
    async e => {
      e.preventDefault();
      const res = await updateItem({
        variables: {
          id,
          ...statex,
        },
      });
    },
    [id, statex, updateItem]
  );

  if (networkStatus === 4) {
    return <div>Refetching!...</div>;
  }
  if (loading || !data || !data.item || networkStatus!==7) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Error! ${error}</div>;
  }

  return (
    <>
      <Form onSubmit={handleSubmitUpdateItem}>
        <DisplayError error={errorMutation} />
        <fieldset disabled={updating} aria-busy={updating}>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              defaultValue={data.item.title}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="price">
            Price
            <input
              type="number"
              id="price"
              name="price"
              placeholder="price"
              required
              defaultValue={data.item.price}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="description"
              required
              defaultValue={data.item.description}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </Form>
    </>
  );
};

export { UpdateItem, UPDATE_ITEM_MUTATION };
