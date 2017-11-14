import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { Route } from 'react-router-dom';

const InsideMain = ({ auth, authRoute, routes, handleLogOut }) => (
  <div>
    {
      routes.requiringAuth.map(({ path, title, ComponentClass }) => (
        auth.user ? (
          <Route
            exact
            path={path}
            key={path}
            render={props => (
              <div>
                <Helmet><title>{title}</title></Helmet>
                <ComponentClass {...props} />
              </div>
            )}
          />
        ) : (
          <Route
            exact
            path={path}
            key={path}
            render={props => (
              <section key="must-log-in-first">
                <Helmet><title>{title}</title></Helmet>
                <h2>You must log in first.</h2>
                <authRoute.ComponentClass {...props} handleLogOut={handleLogOut} />
              </section>
            )}
          />
        )
      ))
    }

    {
      routes.noAuth.map(({ path, title, ComponentClass }) => (
        <Route
          exact
          path={path}
          key={path}
          render={props => (
            <div>
              <Helmet><title>{title}</title></Helmet>
              <ComponentClass {...props} />
            </div>
          )}
        />
      ))
    }

    <Route
      exact
      path={authRoute.path}
      render={props => (
        <div>
          <Helmet>
            <title>
              { auth.user ? authRoute.loggedInText : authRoute.notLoggedInText }
            </title>
          </Helmet>
          <authRoute.ComponentClass {...props} handleLogOut={handleLogOut} />
        </div>
      )}

      key={authRoute.path}
    />
  </div>
);

InsideMain.propTypes = {
  auth: PropTypes.shape().isRequired,
  authRoute: PropTypes.shape().isRequired,
  routes: PropTypes.shape().isRequired,
  handleLogOut: PropTypes.func.isRequired
};

export default InsideMain;
