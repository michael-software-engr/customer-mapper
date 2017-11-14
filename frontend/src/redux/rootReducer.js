
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import auth from '../redux/modules/auth/index';

// Apps...
import customerMapper from '../redux/modules/apps/customerMapper/reducer';

const rootReducer = combineReducers({
  routing,

  // For generic auth
  // auth,
  auth, // For now auth used is from beyondfc

  apps: combineReducers({
    customerMapper
  })
});

export default rootReducer;
