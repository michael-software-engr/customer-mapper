
import nightmare from 'nightmare';

// ... Node only?
import URL from 'url';

import BASE_URL from './servers';

const visit = (path = '', query = {}) => {
  const location = URL.resolve(BASE_URL, path, query);

  // IMPORTANT: if you want to see it in action, pass { show: true }.
  return nightmare({ show: true }).goto(location);

  // return nightmare().goto(location);
};

export default visit;
