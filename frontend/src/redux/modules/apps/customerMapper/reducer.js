
import { combineReducers } from 'redux';

import api from './api/reducer';
import app from './app/reducer';

import statusCreator from './lib/status';
import { actionTypes } from './actions';

const initialState = {};

// ... be careful when changing this state. It's being used
//   in equality test - equality based on state contents.
function status(state = initialState, action = {}) {
  const { payload } = action;
  switch (action.type) {
  case actionTypes.SET_STATUS:
    return statusCreator({
      ...payload, dismissed: false
    });

  case actionTypes.DISMISS_STATUS:
    return statusCreator({
      ...state,
      dismissed: true,
      success: false,
      error: false
    });

  case actionTypes.SHOW_STATUS:
    return statusCreator({ ...state, dismissed: false });

  default:
    return state;
  }
}

export default combineReducers({ api, app, status });
