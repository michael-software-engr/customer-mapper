import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

// ... React Router/Redux deep integration
import { ConnectedRouter } from 'react-router-redux';
//   Before deep integration...
// import { BrowserRouter as Router } from 'react-router-dom';

import RoutesContainer from '../../routes/RoutesContainer';
import DevTools from '../DevTools';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <ConnectedRouter history={history}>
        <RoutesContainer />
      </ConnectedRouter>
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
};

export default Root;
