
const combineRequestOptions = (requestOptions = {}, headers) => ({
  ...requestOptions,
  headers: {
    ...headers,
    ...requestOptions.headers
  }
});

export default combineRequestOptions;
