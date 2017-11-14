
const reduxKey = 'reduxState';

const set = (state) => {
  localStorage.setItem(reduxKey, JSON.stringify({
    ...state,

    // // Apps custom stuff...
    // apps: {
    //   ...state.apps,

    //   someApp: { ...someThing }
    // }
  }));
};

const get = () => (
  localStorage.getItem(reduxKey) ? JSON.parse(localStorage.getItem(reduxKey)) : {}
);

const exp = { set, get };

export default exp;
