
// ... Node only?
import URL from 'url';

const BASE_URL = URL.format({
  protocol: process.env.PROTOCOL || 'http',
  hostname: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000
});

export default BASE_URL;
