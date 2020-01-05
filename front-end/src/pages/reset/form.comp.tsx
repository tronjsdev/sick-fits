import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Form } from '@components/styles';
import { DisplayError, CURRENT_USER_QUERY } from '@components';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(password: $password, confirmPassword: $confirmPassword, resetToken: $resetToken) {
      id
      name
      email
    }
  }
`;

const ResetForm = ({ resetToken }) => {
  const [formData, setFormData] = React.useState({
    confirmPassword: '',
    password: '',
  });
  const [signin, { loading, data, error }] = useMutation(RESET_PASSWORD_MUTATION, {
    variables: { ...formData, resetToken },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleInput = React.useCallback(
    e => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData]
  );
  const handleSubmitSigninForm = React.useCallback(
    async e => {
      e.preventDefault();
      await signin();
    },
    [signin]
  );

  return (
    <Form method={'POST'} onSubmit={handleSubmitSigninForm}>
      <fieldset disabled={loading} aria-busy={loading}>
        {error && <DisplayError error={error} />}
        <h2>Reset Password</h2>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInput}
          />
        </label>
        <button type="submit">Signin</button>
      </fieldset>
    </Form>
  );
};

export { ResetForm };
