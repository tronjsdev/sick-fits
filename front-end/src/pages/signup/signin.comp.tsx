import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Form } from '@components/styles';
import { DisplayError, CURRENT_USER_QUERY } from '@components';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const SigninComp = () => {
  const [signinFormData, setSigninFormData] = React.useState({
    email: '',
    password: '',
  });
  const [signin, { loading, data, error }] = useMutation(SIGNIN_MUTATION, {
    variables: signinFormData,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleInput = React.useCallback(
    e => {
      const { name, value } = e.target;
      setSigninFormData({
        ...signinFormData,
        [name]: value,
      });
      console.log('signinFormData', signinFormData);
    },
    [signinFormData]
  );
  const handleSubmitSigninForm = React.useCallback(
    async e => {
      e.preventDefault();
      console.log('Signup form data', signinFormData);
      await signin();
    },
    [signin, signinFormData]
  );

  return (
    <Form method={'POST'} onSubmit={handleSubmitSigninForm}>
      <fieldset disabled={loading} aria-busy={loading}>
        {error && <DisplayError error={error} />}
        <h2>Signin</h2>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={signinFormData.email}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            value={signinFormData.password}
            onChange={handleInput}
          />
        </label>
        <button type="submit">Signin</button>
      </fieldset>
    </Form>
  );
};

export { SigninComp };
