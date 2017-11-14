
const getStatusValues = (success, error) => {
  const errorClassName = error ? ' error' : null;

  return {
    className: (errorClassName || (success ? ' success' : '')),
    defaultHeader: (error && 'Error') || (success && 'Success') || 'Status'
  };
};

export default getStatusValues;
