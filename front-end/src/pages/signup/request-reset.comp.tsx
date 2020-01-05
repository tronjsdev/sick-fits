import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Form } from '@components/styles';
import { DisplayError, CURRENT_USER_QUERY } from '@components';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RequestReset = () => {
  const [formData, setFormData] = React.useState({
    email: '',
  });
  const [requestReset, { loading, data, error }] = useMutation(RESET_MUTATION, {
    variables: formData,
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
  const handleSubmitForm = React.useCallback(
    async e => {
      e.preventDefault();
      await requestReset();
    },
    [requestReset]
  );

  return (
    <Form method={'POST'} onSubmit={handleSubmitForm}>
      <fieldset disabled={loading} aria-busy={loading}>
        {error && <DisplayError error={error} />}
        <h2>Request Password Reset</h2>
        {data?.requestReset?.message && <p>Success, check your email for reset password link</p>}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInput}
          />
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
};

export { RequestReset };
