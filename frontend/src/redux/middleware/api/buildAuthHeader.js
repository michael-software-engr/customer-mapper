
const buildAuthHeader = (state) => {
  // const baseHeaders = {
  //   'X-CSRF-Token': this.state.authenticity_token,
  //   'Content-Type': 'application/json'
  // };

  const { auth } = state;
  if (!auth) return {};

  const { user } = auth;
  if (!user) return {};

  const { jwt } = user;
  if (!jwt) return {};

  return { Authorization: `Bearer ${jwt}` };
};

export default buildAuthHeader;
