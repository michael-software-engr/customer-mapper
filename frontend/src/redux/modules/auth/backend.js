
import { isDev } from '../../../lib/index';

export default () => (
  isDev() ? 'http://localhost:5000/' : (
    'https://staging-beyondfc.herokuapp.com/'
  )
);
