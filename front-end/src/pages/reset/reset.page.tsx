import React from 'react';
import { withApollo } from '@libs';

import { ResetForm } from './form.comp';

const ResetPage = ({ query }) => {
  const { resetToken } = query;
  return (
    <div>
      <ResetForm resetToken={resetToken} />
    </div>
  );
};

export default withApollo(ResetPage);
