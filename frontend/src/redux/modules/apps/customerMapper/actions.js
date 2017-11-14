
const SET_STATUS = 'app/customerMapper/MAP_DATA_SET_STATUS';
const DISMISS_STATUS = 'app/customerMapper/MAP_DATA_DISMISS_STATUS';
const SHOW_STATUS = 'app/customerMapper/MAP_DATA_SHOW_STATUS';

const actionTypes = {
  SET_STATUS,
  DISMISS_STATUS,
  SHOW_STATUS
};

export const setStatus = payload => ({
  type: SET_STATUS, payload
});

export const dismissStatus = () => ({
  type: DISMISS_STATUS
});

export const showStatus = () => ({
  type: SHOW_STATUS
});

export { actionTypes };
