
import actionTypes from './actionTypes';

const {
  SET_PREV_ROUTING,
  SET_IS_HANDLING_INPUT_CHANGE,

  SET_INPUT_FORM_VISIBILITY,
  SET_VEHICLE_FORM_VISIBILITY,

  SET_IS_POLLING,
  SET_IS_SUBMITTING,

  SET_CUSTOMER_WINDOW
} = actionTypes;

export function setInputFormVisibility(isVisible) {
  return {
    type: SET_INPUT_FORM_VISIBILITY, payload: isVisible
  };
}

export function setVehicleFormVisibility(isVisible) {
  return { type: SET_VEHICLE_FORM_VISIBILITY, payload: isVisible };
}

export const setPrevRouting = payload => ({
  type: SET_PREV_ROUTING, payload
});

export const setIsHandlingInputChange = payload => ({
  type: SET_IS_HANDLING_INPUT_CHANGE, payload
});

export const setIsPolling = payload => ({
  type: SET_IS_POLLING, payload
});

export const setIsSubmitting = payload => ({
  type: SET_IS_SUBMITTING, payload
});

export function setCustomerWindow(payload) {
  return { type: SET_CUSTOMER_WINDOW, payload };
}
