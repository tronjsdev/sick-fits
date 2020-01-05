import React from 'react';
import { Mutation } from 'react-apollo';
import { formatMoney, faker } from '@libs';
import { DisplayError } from '@components';
import gql from 'graphql-tag';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

import Form from '../styles/Form';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const CreateItem = () => {
  const [statex, setStatex] = React.useState({
    title: faker.commerce.productName(),
    description: faker.commerce.productMaterial(),
    image: '',
    largeImage: '',
    price: parseInt(faker.commerce.price(),10),
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

  const uploadFile = React.useCallback(
    async e => {
      const { files } = e.target;
      if (!files || !files[0]) {
        return;
      }
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'sickfits');
      const res = await fetch('https://api.cloudinary.com/v1_1/bokyvy/image/upload', {
        method: 'POST',
        body: data,
      });
      const file = await res.json();
      console.log(file);
      setStatex({
        ...statex,
        image: file.secure_url,
        largeImage: file.eager[0].secure_url,
      });
    },
    [statex]
  );

  return React.useMemo(
    () => (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={statex}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < 17; i++) {
                setStatex({
                  ...statex,
                  title: faker.commerce.productName(),
                  description: faker.commerce.productMaterial(),
                  price: parseInt(faker.commerce.price(),10),
                })
                // eslint-disable-next-line no-await-in-loop
                await createItem();
              }
              //const res = await createItem();
              /*console.log(res);
              Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id },
              });*/
            }}
          >
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={uploadFile}
                />
                {statex.image && <img src={statex.image} alt="Upload preview" width={200} />}
              </label>

              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={statex.title}
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
                  value={statex.price}
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
                  value={statex.description}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    ),
    [handleChange, statex, uploadFile]
  );
};

export { CreateItem, CREATE_ITEM_MUTATION };
