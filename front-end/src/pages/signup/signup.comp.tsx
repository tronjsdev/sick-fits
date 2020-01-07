import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Form } from '@components/styles';
import { DisplayError } from '@components';
import faker from 'faker';
import {CURRENT_USER_QUERY} from "@libs";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      name
      email
    }
  }
`;

const SignupComp = () => {
  const [signupFormData, setSignupFormData] = React.useState({
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    password: faker.internet.password(),
  });
  const [signup, { loading, data, error }] = useMutation(SIGNUP_MUTATION, {
    variables: signupFormData,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleInput = React.useCallback(
    e => {
      debugger;
      const { name, value } = e.target;
      setSignupFormData({
        ...signupFormData,
        [name]: value,
      });
    },
    [signupFormData]
  );
  const handleSubmitSignupForm = React.useCallback(
    async e => {
      e.preventDefault();
      console.log('Signup form data', signupFormData);
      await signup();
    },
    [signup, signupFormData]
  );

  return (
    <Form method={'POST'} onSubmit={handleSubmitSignupForm}>
      <fieldset disabled={loading} aria-busy={loading}>
        {error && <DisplayError error={error} />}
        <h2>Signup for an account</h2>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={signupFormData.email}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            value={signupFormData.name}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            value={signupFormData.password}
            onChange={handleInput}
          />
        </label>
        <button type="submit">Signup</button>
      </fieldset>
    </Form>
  );
};

export { SignupComp };
