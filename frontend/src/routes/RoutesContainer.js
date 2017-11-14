import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import {
  setInputFormVisibility,
  setVehicleFormVisibility,
  setCustomerWindow,
  setIsHandlingInputChange
} from '../redux/modules/apps/customerMapper/app/actions';

import CustomerForm from '../containers/apps/customerMapper/CustomerForm';
import VehicleForm from '../containers/apps/customerMapper/VehicleForm';
import CustomerWindow from '../components/apps/customerMapper/customerWindow/CustomerWindow';

import Structure from '../components/structure/Structure';

import Menu from '../components/nav/menu/Menu';
// import NavBar from '../components/nav/navBar/NavBar';

import routes, {
  authRoute,
  // routesMeta
} from './routes';

import { logout } from '../redux/modules/auth';

import storedState from '../redux/storedState';

import InsideMain from './InsideMain';

import app from '../app';

import excludeMainStructureIf from './excludeMainStructureIf';

// Special vars for BurgerMenu
const outerContainerId = 'App';
const pageWrapId = 'Main';

class RoutesContainer extends React.Component {
  static propTypes = {
    customerMapper: PropTypes.shape().isRequired,
    reduxState: PropTypes.shape().isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.shape().isRequired,
    routing: PropTypes.shape().isRequired,
    setInputFormVisibility: PropTypes.func.isRequired,
    setVehicleFormVisibility: PropTypes.func.isRequired,
    setCustomerWindow: PropTypes.func.isRequired,
    setIsHandlingInputChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    storedState.set(nextProps.reduxState);

    // // ... persist log out state, START
    // // No need to check. This should not be null.
    // const { auth } = nextProps.reduxState;

    // if (!auth.user) storedState.set(nextProps.reduxState);
    // // ... persist log out state, END
  }

  handleLogOut() {
    // We shouldn't be here if auth.user.data.id is not defined.
    //   Let it fail.
    this.props.logout(this.props.auth.user.data.id);
  }

  render() {
    const { handleLogOut } = this;

    const { customerWindow } = this.props.customerMapper.app;

    return (
      <Structure.App outerContainerId={outerContainerId}>
        <Helmet
          titleTemplate={`%s | ${app.title}`}
          defaultTitle={app.title}
        />

        <Menu
          app={app}
          auth={this.props.auth}
          // authRoute={authRoute}
          handleLogOut={handleLogOut}
          setInputFormVisibility={this.props.setInputFormVisibility}
          setVehicleFormVisibility={this.props.setVehicleFormVisibility}
          setIsHandlingInputChange={this.props.setIsHandlingInputChange}
          setCustomerWindow={this.props.setCustomerWindow}

          routes={
            routes.requiringAuth.concat(routes.noAuth, routes.other)
          }

          outerContainerId={outerContainerId}
          pageWrapId={pageWrapId}
        />

        {/*
        <NavBar
          auth={auth}
          authRoute={authRoute}

          left={buildRoutes(['teams', 'gmap', 'osm'])}
          right={buildRoutes([])}
        />
        */}

        <CustomerForm />
        <VehicleForm />
        <CustomerWindow
          customerWindow={customerWindow}
          setCustomerWindow={this.props.setCustomerWindow}
          setIsHandlingInputChange={this.props.setIsHandlingInputChange}
        />

        {
          routes.other.map(({ path, title, isMap, ComponentClass, Presenter }) => (
            isMap ? (
              <Route
                exact
                path={path}

                render={props => (
                  <ComponentClass {...props} Presenter={Presenter} title={title} />
                )}

                key={path}
              />
            ) : (
              <Route
                exact
                path={path}
                key={path}
                render={props => (
                  <div>
                    <Helmet><title>{title}</title></Helmet>
                    <ComponentClass {...props} />
                  </div>
                )}
              />
            )
          ))
        }

        {
          excludeMainStructureIf({
            location: this.props.routing.location,
            isOneOf: routes.other
          })
            ? (
              // For Burger Menu, it expects #Main
              <div id="Main" />
            )
            : (
              <Structure.Main pageWrapId={pageWrapId}>
                <InsideMain
                  auth={this.props.auth}
                  authRoute={authRoute}
                  routes={routes}
                  handleLogOut={handleLogOut}
                />
              </Structure.Main>
            )
        }
      </Structure.App>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    auth, routing, apps: { customerMapper }
  } = state;

  return {
    auth, routing, customerMapper, reduxState: state
  };
};

export default withRouter(connect(mapStateToProps, {
  logout,
  setInputFormVisibility,
  setVehicleFormVisibility,
  setCustomerWindow,
  setIsHandlingInputChange
})(RoutesContainer));
