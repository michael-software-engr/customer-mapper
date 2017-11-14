
import actionTypes from './actionTypes';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  const { payload } = action;
  switch (action.type) {
  case actionTypes.SET_INPUT_FORM_VISIBILITY:
    return {
      ...state,
      inputFormIsVisibleGlobalControl: payload
    };

  case actionTypes.SET_VEHICLE_FORM_VISIBILITY:
    return {
      ...state,
      isVehicleFormVisible: payload
    };

  case actionTypes.SET_PREV_ROUTING:
    return {
      ...state,
      prevRouting: payload
    };

  case actionTypes.SET_IS_HANDLING_INPUT_CHANGE:
    return {
      ...state,
      isHandlingInputChange: payload
    };

  case actionTypes.SET_IS_POLLING:
    return {
      ...state,
      isPolling: payload
    };

  case actionTypes.SET_IS_SUBMITTING:
    return {
      ...state,
      isSubmitting: payload
    };

  case actionTypes.SET_CUSTOMER_WINDOW:
    if (!payload) {
      return {
        ...state, customerWindow: null
      };
    }

    return {
      ...state,
      customerWindow: {
        isVisible: payload.isVisible, customer: payload.customer
      }
    };

  default:
    return state;
  }
}
