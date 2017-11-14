import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import createHistory from 'history/createBrowserHistory';

import 'semantic-ui-css/semantic.min.css';

import registerServiceWorker from './registerServiceWorker';

import Root from './containers/Root/Index';
import configureStore from './store/configureStore';

// import storedState from './redux/storedState';

import './index.css';

const history = createHistory();

// ... React Router/Redux deep integration.
//   Prior to the deep integration, this function was invoked without args.
const store = configureStore({
  // preloadedState: storedState.get(),
  history
});

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
registerServiceWorker();
