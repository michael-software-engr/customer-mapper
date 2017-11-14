
import validated from './validated';

const buildPath = (path = '') => `/frontend/${path}`;

const validate = (routeName, routesByName) => {
  const route = routesByName[routeName];

  if (!route) throw Error(`Route '${routeName}' does not exist.`);
  ['path', 'text', 'ComponentClass'].forEach((key) => {
    if (!route[key]) {
      throw Error(
        `'${key}' property for route '${JSON.stringify(route)}' must be truthy.`
      );
    }
  });

  return route;
};

const addProperties = (route) => {
  const title = route.title || route.text; // The <title>... inside <head>...

  return { ...route, title };
};

const buildRoutes = (routeNames, routesByName) => (
  routeNames.map((routeName) => {
    const route = validate(routeName, routesByName);
    return addProperties(route);
  })
);

export { buildPath, buildRoutes, validated };
