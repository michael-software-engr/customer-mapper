import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { routerMiddleware } from 'react-router-redux';

import api from '../redux/middleware/api/index';

// Apps...
// None

import rootReducer from '../redux/rootReducer';

const configureStore = ({
  preloadedState,

  // ... React Router/Redux deep integration
  history
}) => {
  const store = createStore(
    rootReducer,
    preloadedState,
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

  return store;
};

export default configureStore;
