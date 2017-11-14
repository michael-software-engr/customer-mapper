
import React from 'react';

import Auth from '../containers/auth/Auth';

// Customer Mapper
import CustomerMapper from '../containers/apps/customerMapper/CustomerMapper';
import CustomerMapperPresenter from '../components/apps/customerMapper/gMap/GMapPresenter';

import { buildPath, buildRoutes, validated } from './lib';

const authRoute = {
  text: 'Login', // Used in testing, should be same as notLoggedInText
  notLoggedInText: 'Login',
  loggedInText: 'My Account',

  path: buildPath('auth'),
  ComponentClass: Auth,

  icon: 'user circle outline'
};

const routesByName = {
  // ... apps
  // Customer Mapper
  customerMapper: {
    path: '/',
    text: 'Map',
    ComponentClass: CustomerMapper,
    isMap: true,
    Presenter: CustomerMapperPresenter,
    icon: 'map'
  },

  customerForm: {
    path: '/customer-form',
    text: 'Customer Form',
    ComponentClass: () => <div />,
    icon: 'user'
  },

  vehicleForm: {
    path: '/vehicle-form',
    text: 'Vehicle Form',
    ComponentClass: () => <div />,
    icon: 'car'
  }
};

const routes = {
  // Routes contained in the "main" container, START
  //   What are the characteristics of the main container?
  //   For example: the main container allows certain BurgerMenu animations
  //   to work.

  // // The login route/page
  // auth: authRoute,

  // Routes requiring user to login
  requiringAuth: buildRoutes([
  ], routesByName),

  noAuth: buildRoutes([
  ], routesByName),
  // Routes contained in the "main" container, END

  // other is outside main and not auth
  other: buildRoutes([
    'customerMapper'
  ], routesByName)
};

const routesMeta = {
  areMapRoutesPresent: routes.other.length > 0,

  // Count of visible links in menu.
  linksCount: Object.values(routes).reduce(
    (memo, rteGroup) => (
      memo + rteGroup.filter(route => !route.noUrl).length
    ),

    [authRoute].length // The idea here is to put special cases here.
  )
};

export {
  // The login route/page, should be inside main
  authRoute,
  routesMeta
};

export default validated(routes);
