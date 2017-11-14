
import lodash from 'lodash';

import actionTypes from './actionTypes';

import lib from './lib';

const initialState = {
  customersLoaded: false,
  customersLoading: false,

  customers: [],
  customersByCityAndState: {},
  customersByZip: {},

  requestError: null
};

export default function reducer(state = initialState, action = {}) {
  const { error, response } = action;

  let newStateCustomers;
  let targetCustomer;

  let customers;

  switch (action.type) {
  case actionTypes.FETCH_CUSTOMERS_REQUEST:
    return {
      ...state,
      customersLoaded: false,
      customersLoading: true,
      // customers: [...], // Just keep current state
      requestError: null
    };

  case actionTypes.FETCH_CUSTOMERS_SUCCESS:
    if (!response) throw Error('no response property');

    // ... because hash not array, nextPageUrl prop
    customers = Object.keys(response)
      .filter(key => key !== 'nextPageUrl')
      .sort()
      .map(key => response[key]);

    return {
      ...state,
      customersLoading: false,
      customersLoaded: true,

      customers,
      customersByCityAndState: lib.byCityAndState(customers),
      customersByZip: lib.byZip(customers),

      requestError: null
    };

  case actionTypes.FETCH_CUSTOMERS_FAIL:
    return {
      ...state,
      customersLoading: false,
      customersLoaded: false,
      // customers: [...], // Just keep current state
      requestError: error
    };

  case actionTypes.SEARCH_BY_JOB_ID_REQUEST:
    return {
      ...state,
      searchByJobIdLoading: true,
      searchByJobIdLoaded: false,
      // customers: [...], // Just keep current state
      requestError: null
    };

  case actionTypes.SEARCH_BY_JOB_ID_SUCCESS:
    if (!response) throw Error('no response property');

    if (!response.customer) return state;

    return {
      ...state,
      searchByJobIdLoading: false,
      searchByJobIdLoaded: true,

      customers: [response.customer],
      // customers: [...state.customers, response.customer],

      requestError: null
    };

  case actionTypes.SEARCH_BY_JOB_ID_FAIL:
    return {
      ...state,
      searchByJobIdLoading: false,
      searchByJobIdLoaded: false,
      // customers: [...], // Just keep current state
      requestError: error
    };

  case actionTypes.CREATE_VEHICLE_REQUEST:
    return {
      ...state,
      createVehicleLoading: true,
      createVehicleLoaded: false,
      // customers: [...], // Just keep current state
      requestError: null
    };

  case actionTypes.CREATE_VEHICLE_SUCCESS:
    if (!response) throw Error('no response property');

    newStateCustomers = lodash.cloneDeep(state.customers);
    targetCustomer = state.customers.map(
      (customer, ix) => ({ id: customer.id, ix })
    ).find(
      ({ id }) => id === response.customerId
    );

    if (!targetCustomer) {
      console.error(
        'Unable to find customer from state...',
        { response, customersFromState: state.customers }
      );
      return state;
    }

    newStateCustomers[targetCustomer.ix].vehicles = [
      ...(newStateCustomers[targetCustomer.ix].vehicles || []), response
    ];

    return {
      ...state,
      createVehicleLoading: false,
      createVehicleLoaded: true,
      customers: [newStateCustomers[targetCustomer.ix]],
      // customers: newStateCustomers,
      requestError: null
    };

  case actionTypes.CREATE_VEHICLE_FAIL:
    return {
      ...state,
      createVehicleLoading: false,
      createVehicleLoaded: false,
      // customers: [...], // Just keep current state
      requestError: error
    };

  case actionTypes.SET_CUSTOMERS_AFTER_SEARCH:
    return {
      ...state,
      customers: action.payload
    };

  default:
    return state;
  }
}
