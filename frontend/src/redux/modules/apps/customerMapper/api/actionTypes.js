
const FETCH_CUSTOMERS_REQUEST = 'app/customerMapper/api/FETCH_CUSTOMERS_REQUEST';
const FETCH_CUSTOMERS_SUCCESS = 'app/customerMapper/api/FETCH_CUSTOMERS_SUCCESS';
const FETCH_CUSTOMERS_FAIL = 'app/customerMapper/api/FETCH_CUSTOMERS_FAIL';

const CREATE_CUSTOMER_REQUEST = 'app/customerMapper/api/CREATE_CUSTOMER_REQUEST';
const CREATE_CUSTOMER_SUCCESS = 'app/customerMapper/api/CREATE_CUSTOMER_SUCCESS';
const CREATE_CUSTOMER_FAIL = 'app/customerMapper/api/CREATE_CUSTOMER_FAIL';

const CREATE_VEHICLE_REQUEST = 'app/customerMapper/api/CREATE_VEHICLE_REQUEST';
const CREATE_VEHICLE_SUCCESS = 'app/customerMapper/api/CREATE_VEHICLE_SUCCESS';
const CREATE_VEHICLE_FAIL = 'app/customerMapper/api/CREATE_VEHICLE_FAIL';

const SEARCH_BY_JOB_ID_REQUEST = 'app/customerMapper/api/SEARCH_BY_JOB_ID_REQUEST';
const SEARCH_BY_JOB_ID_SUCCESS = 'app/customerMapper/api/SEARCH_BY_JOB_ID_SUCCESS';
const SEARCH_BY_JOB_ID_FAIL = 'app/customerMapper/api/SEARCH_BY_JOB_ID_FAIL';

const SET_CUSTOMERS_AFTER_SEARCH = 'app/customerMapper/api/SET_CUSTOMERS_AFTER_SEARCH';

const actionTypes = {
  FETCH_CUSTOMERS_REQUEST,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAIL,

  CREATE_CUSTOMER_REQUEST,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAIL,

  CREATE_VEHICLE_REQUEST,
  CREATE_VEHICLE_SUCCESS,
  CREATE_VEHICLE_FAIL,

  SEARCH_BY_JOB_ID_REQUEST,
  SEARCH_BY_JOB_ID_SUCCESS,
  SEARCH_BY_JOB_ID_FAIL,

  SET_CUSTOMERS_AFTER_SEARCH
};

export default actionTypes;
