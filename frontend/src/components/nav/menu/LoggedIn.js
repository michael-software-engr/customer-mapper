import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  // Button,
  Icon
} from 'semantic-ui-react';

const LoggedIn = ({
  authRoute,
  handleLinkClick
}) => {
  const { path, icon, loggedInText } = authRoute;

  return (
    <div className="user-info">
      <Link to={path} onClick={handleLinkClick}>
        <Icon name={icon} />
        <span>{
          // No need to check because should be truthy chain maybe?
          // user.data.email
          loggedInText
        }</span>
      </Link>

      {/*
      <hr />

      <Button
        animated="vertical"
        size="large"
        fluid
        onClick={handleLogOut}
      >
        <Button.Content hidden className="sign-out">Sign Out</Button.Content>
        <Button.Content visible>
          <Icon name="sign out" />
        </Button.Content>
      </Button>
      */}

    </div>
  );
};

LoggedIn.propTypes = {
  authRoute: PropTypes.shape().isRequired,
  handleLinkClick: PropTypes.func.isRequired
};

export default LoggedIn;
