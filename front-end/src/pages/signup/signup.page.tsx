import React from 'react';
import {styled, withApollo} from '@libs';

import { SignupComp} from './signup.comp';
import { SigninComp} from './signin.comp';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = () => {
  return (
    <Columns>
      <SignupComp />
      <SigninComp />
      
    </Columns>
  );
};

export default withApollo(SignupPage);
