
import { isDev } from '../../../../../lib/index';

export default () => (
  isDev() ? 'http://localhost:3000/' : (
    'https://customer-mapper.herokuapp.com/'
  )
);
