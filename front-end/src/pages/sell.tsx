import React from 'react';
import { CreateItem, DisplayError } from '@components';
import { withApollo, useUser } from '@libs';

// eslint-disable-next-line react/display-name
const SellPage = props => {
  const { data, loading }: any = useUser();
  debugger;
  const { me } = data || {};
  return React.useMemo(() => {
    if (loading) {
      return <p>Loading...</p>;
    }
    return <div>{me ? <CreateItem /> : <p>You must be loggedin first</p>}</div>;
  }, [loading, me]);
};

export default withApollo(SellPage);
