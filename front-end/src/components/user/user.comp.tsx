import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      name
      permissions
    }
  }
`;

interface Props {
  children: (payload: any) => any;
}

const User: React.FunctionComponent<Props> = props => {
  const payload = useQuery(CURRENT_USER_QUERY);
  return props.children(payload);
};

export { CURRENT_USER_QUERY };
export {User};
