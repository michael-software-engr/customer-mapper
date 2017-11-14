import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import { createLogger } from 'redux-logger';

import { routerMiddleware } from 'react-router-redux';

import api from '../redux/middleware/api/index';

// Apps...
// None

import rootReducer from '../redux/rootReducer';

import DevTools from '../containers/DevTools';

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

        // createLogger()
      ),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../redux/rootReducer', () => {
      const nextRootReducer = require('../redux/rootReducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
