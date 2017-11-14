
import routes, { authRoute } from '../../routes/routes';

const routesArray = Object.values(routes).reduce(
  (memo, rteGroup) => ([...memo, ...rteGroup].filter(route => !route.noUrl)),
  []
).concat(authRoute);

const preferDefaultDummy = '';
export {
  preferDefaultDummy,
  routesArray
};
