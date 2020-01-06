import React from 'react';
import { CreateItem, DisplayError } from '@components';
import { withApollo, useUser } from '@libs';

// eslint-disable-next-line react/display-name
const SellPage = props => {
  const user = useUser();
  return React.useMemo(
    () => <div>{user ? <CreateItem /> : <p>You must be loggedin first</p>}</div>,
    [user]
  );
};

export default withApollo(SellPage);
