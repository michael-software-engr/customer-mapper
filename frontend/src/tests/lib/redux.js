
import React from 'react';
import PropTypes from 'prop-types';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';

import {
  MemoryRouter
} from 'react-router-dom';
import { routerMiddleware } from 'react-router-redux';


import api from '../../redux/middleware/api/index';

// Apps...
// None

import rootReducer from '../../redux/rootReducer';

const history = createHistory();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk,

      // Common API middleware
      api,

      // Apps specific API middlewares
      // None

      // ... React Router/Redux deep integration
      routerMiddleware(history)
    )
  )
);

const TestReduxContainer = props => (
  <Provider store={store}>
    <MemoryRouter>
      {props.children}
    </MemoryRouter>
  </Provider>
);

TestReduxContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default TestReduxContainer;
