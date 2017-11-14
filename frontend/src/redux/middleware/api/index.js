import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

// ... for ESLint
import Promise from 'es6-promise';

import validate from './validations';
import buildAuthHeader from './buildAuthHeader';
import combineRequestOptions from './combineRequestOptions';

// ... !!Not sure if this is specific to GitHub.
//       It seems other sites follow the same pattern!! //
// Extracts the next page URL from Github API response.
const getNextPageUrl = (response) => {
  const link = response.headers.get('link');
  if (!link) {
    return null;
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
  if (!nextLink) {
    return null;
  }

  return nextLink.split(';')[0].slice(1, -1);
};

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (apiRoot, endpoint, apiSchema, requestOptions) => {
  const fullUrl = (endpoint.indexOf(apiRoot) === -1) ? apiRoot + endpoint : endpoint;

  return fetch(fullUrl, requestOptions)
    .then(response =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }

        const camelizedJson = camelizeKeys(json);
        const nextPageUrl = getNextPageUrl(response);

        // ... to allow for free form data, one that is not restricted by bullsh*t schema.
        const data = apiSchema ? normalize(camelizedJson, apiSchema) : camelizedJson;
        return Object.assign({},
          data,
          { nextPageUrl }
        );
      })
    );
};

// ... not sure if this is part of GitHub or not.
// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call Generic API';
// export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => (action) => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { types, apiRoot, requestOptions } = callAPI;
  const apiSchema = callAPI.schema;

  const state = store.getState();
  const endpointProp = callAPI.endpoint;
  const endpoint = (
    typeof endpointProp === 'function' ? endpointProp(state) : endpointProp
    // typeof endpointProp === 'function' ? endpointProp(store.getState()) : endpointProp
  );

  validate(endpoint, types);

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  const requestOptionsCombined = combineRequestOptions(
    requestOptions, {
      'Content-Type': 'application/json',
      ...buildAuthHeader(state)
    }
  );

  return callApi(apiRoot, endpoint, apiSchema, requestOptionsCombined).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.error || error.message || error.exception || 'Unknown error'
    }))
  );
};
