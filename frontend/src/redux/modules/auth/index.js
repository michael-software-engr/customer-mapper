
// https://github.com/erikras/ducks-modular-redux
// Rules

// A module...

//     MUST export default a function called reducer()
//     MUST export its action creators as functions
//     MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
//     MAY export its action types as UPPER_SNAKE_CASE,
//       if an external reducer needs to listen for them, or if it is a published reusable library

import { decamelizeKeys } from 'humps';

import doFetch from '../../middleware/api/doFetch';

import backend from './backend';

// TODO
// import { validator } from '../../middleware/auth/validator';

const LOGIN_REQUEST = 'app/auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'app/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'app/auth/LOGIN_FAIL';

const LOGOUT_REQUEST = 'app/auth/LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'app/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'app/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return {
      ...state,
      loggingIn: true
    };

  case LOGIN_SUCCESS:
    if (!action.response) throw Error('no response property');

    return {
      ...state,
      loggingIn: false,
      loginError: null,

      user: {
        jwt: action.response.jwt,
        data: action.response.user
      }
    };

  case LOGIN_FAIL:
    return {
      ...state,
      loggingIn: false,
      user: null,

      loginError: action.error
    };

  case LOGOUT_REQUEST:
    return {
      ...state,
      loggingOut: true
    };

  case LOGOUT_SUCCESS:
    return {
      ...state,
      loggingOut: false,
      logoutError: null,

      user: null
    };

  case LOGOUT_FAIL:
    return {
      ...state,
      loggingOut: false,
      logoutError: action.error,

      // Should we log out user if log out process fails?
      //   Not sure but I feel like this is the safer option.
      user: null
    };

  default:
    return state;
  }
}

const apiRoot = backend();

export function login(payload) {
  return function loginDispatch(dispatch) {
    return dispatch(
      doFetch({
        apiRoot,
        endpoint: 'frontend/sign_in.json',
        types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL],
        payload: { user: decamelizeKeys(payload) },
        method: 'post'
      })
    );
  };
}

export function logout(userId) {
  return function logoutDispatch(dispatch) {
    return dispatch(
      doFetch({
        apiRoot,
        endpoint: `frontend/sign_out/${userId}.json`,
        types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL],
        method: 'delete'
      })
    );
  };
}
