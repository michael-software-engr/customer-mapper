
import getStatusValues from './statusMessageHelpers';

// Not sure whether to include in boilerplate or not
const isDev = () => process && process.env && process.env.NODE_ENV === 'development';

export {
  getStatusValues,
  isDev
};
