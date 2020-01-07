import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      name
      permissions
      cart {
        id
        quantity
      }
    }
  }
`;
export const useUser = () => {
  const payload = useQuery(CURRENT_USER_QUERY);
  return payload;
};

const TOGGLE_CART_MUTATION = gql`
  mutation TOGGLE_CART_MUTATION {
    toggleCart @client
  }
`;
export const useToggleCart = () => {
  return useMutation(TOGGLE_CART_MUTATION);
};
