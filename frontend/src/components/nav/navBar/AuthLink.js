import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import '../../../css/components/nav/navBar/NavBar.css';

const AuthLink = ({ user, authRoute }) => {
  const text = user ? user.data.email : 'Log in';
  const { path } = authRoute;

  return <li key={`${path}-${text}`}><Link to={path}>{text}</Link></li>;
};

AuthLink.propTypes = {
  user: PropTypes.shape().isRequired,
  authRoute: PropTypes.shape().isRequired
};

export default AuthLink;
