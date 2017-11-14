
// https://github.com/erikras/ducks-modular-redux
// Rules

// A module...

//     MUST export default a function called reducer()
//     MUST export its action creators as functions
//     MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
//     MAY export its action types as UPPER_SNAKE_CASE,
//       if an external reducer needs to listen for them, or if it is a published reusable library

import { decamelizeKeys } from 'humps';

import doFetch from '../../../../middleware/api/doFetch';

import backend from './backend';
import actionTypes from './actionTypes';

const apiRoot = backend();

export function fetchCustomers() {
  return function fetchCustomersThunk(dispatch) {
    return dispatch(doFetch({
      apiRoot,
      endpoint: 'customers',
      types: [
        actionTypes.FETCH_CUSTOMERS_REQUEST,
        actionTypes.FETCH_CUSTOMERS_SUCCESS,
        actionTypes.FETCH_CUSTOMERS_FAIL
      ]
    }));
  };
}

export function createCustomer(payload) {
  return function createCustomerThunk(dispatch) {
    return dispatch(
      doFetch({
        apiRoot,
        endpoint: 'customers',
        types: [
          actionTypes.CREATE_CUSTOMER_REQUEST,
          actionTypes.CREATE_CUSTOMER_SUCCESS,
          actionTypes.CREATE_CUSTOMER_FAIL
        ],
        payload: { customer: decamelizeKeys(payload) },
        method: 'post'
      })
    );
  };
}

export function createVehicle(payload) {
  return function createVehicleThunk(dispatch) {
    return dispatch(
      doFetch({
        apiRoot,
        endpoint: 'vehicles',
        types: [
          actionTypes.CREATE_VEHICLE_REQUEST,
          actionTypes.CREATE_VEHICLE_SUCCESS,
          actionTypes.CREATE_VEHICLE_FAIL
        ],
        payload: { vehicle: decamelizeKeys(payload) },
        method: 'post'
      })
    );
  };
}

export function searchByJobId(jobId) {
  return function searchByJobIdThunk(dispatch) {
    return dispatch(doFetch({
      apiRoot,
      endpoint: `customers/search_by_job_id/${jobId}`,
      types: [
        actionTypes.SEARCH_BY_JOB_ID_REQUEST,
        actionTypes.SEARCH_BY_JOB_ID_SUCCESS,
        actionTypes.SEARCH_BY_JOB_ID_FAIL
      ]
    }));
  };
}

export function setCustomersAfterSearch(customers) {
  return {
    type: actionTypes.SET_CUSTOMERS_AFTER_SEARCH,
    payload: customers
  };
}
