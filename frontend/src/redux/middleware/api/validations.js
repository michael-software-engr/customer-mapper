
const validate = (endpoint, types) => {
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  // ... to allow for free form data, one that is not restricted by bullsh*t schema.
  // if (!apiSchema) {
  //   throw new Error('Specify one of the exported Schemas.');
  // }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }
};

export default validate;
