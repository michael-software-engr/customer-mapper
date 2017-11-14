import React from 'react';
import PropTypes from 'prop-types';

import { Form, Message } from 'semantic-ui-react';

import Info from './Info';

import { getStatusValues } from '../../lib/index';

const getContent = (error, loginError, success) => {
  if (error) return loginError || 'Log in error';
  if (success) return 'Logged in successfully';

  return null;
};

const AuthPresenter = ({ authData }) => {
  const {
    emailInputName,
    passwordInputName,
    emailInput,
    passwordInput,

    handleInputChange,
    handleLoginClick,
    handleLogOut,
    handleMessageDismiss,

    auth,

    isStatusDismissed
  } = authData;

  const {
    user, loggingIn, loginError
  } = auth;

  const error = !!loginError;
  const success = !!user;

  const content = getContent(error, loginError, success);

  const statusValues = getStatusValues(success, error);

  if (user) return <Info user={user} handleLogOut={handleLogOut} />;

  return (
    <Form success={success} error={error} loading={loggingIn}>
      <Form.Field>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name={emailInputName}
          placeholder="Email"
          value={emailInput}
          autoComplete="on"
          onChange={handleInputChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name={passwordInputName}
          placeholder="Password"
          value={passwordInput}
          onChange={handleInputChange}
        />
      </Form.Field>

      <Form.Button
        type="submit"
        onClick={handleLoginClick}
        defaultValue="login"
      >
        Submit
      </Form.Button>

      <Message
        success={success}
        error={error}
        hidden={isStatusDismissed || (!success && !error && !content)}
        header={statusValues.defaultHeader}
        content={content}
        onDismiss={handleMessageDismiss}
      />
    </Form>
  );
};

AuthPresenter.propTypes = { authData: PropTypes.shape().isRequired };

export default AuthPresenter;
