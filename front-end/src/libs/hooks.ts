import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      name
      permissions
    }
  }
`;
export const useUser = () => {
  const [user, setUser] = React.useState();
  const payload = useQuery(CURRENT_USER_QUERY);
  debugger;
  React.useEffect(() => {
    debugger;
    if (payload.data) {
      setUser(payload.data.me);
    }
  }, [payload.data]);

  return user;
};
