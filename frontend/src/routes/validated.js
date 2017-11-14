
const validated = (routes) => {
  const routesArray = Object.values(routes).reduce(
    (memo, rteGroup) => ([...memo, ...rteGroup]),
    []
  );

  const routesByPath = routesArray.reduce((memo, { path }) => ({
    ...memo, [path]: memo[path] ? memo[path] + 1 : 1
  }), {});

  Object.keys(routesByPath).forEach((key) => {
    if (routesByPath[key] > 1) {
      console.error(
        `Path '${key}' has a duplicate. Paths must be unique. The routes...\n`,
        routes
      );
      throw Error('...');
    }
  });

  const routesByText = routesArray.reduce((memo, { text }) => ({
    ...memo, [text]: memo[text] ? memo[text] + 1 : 1
  }), {});

  Object.keys(routesByText).forEach((key) => {
    if (routesByText[key] > 1) {
      console.error(
        `Text '${key}' has a duplicate. Texts must be unique. The routes...\n`,
        routes
      );
      throw Error('...');
    }
  });

  return routes;
};

export default validated;
