import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import {
  fetchCustomers,
  setCustomersAfterSearch
} from '../../../redux/modules/apps/customerMapper/api/actions';

import {
  setPrevRouting,
  setIsHandlingInputChange,
  setInputFormVisibility,
  setVehicleFormVisibility,
  setCustomerWindow
} from '../../../redux/modules/apps/customerMapper/app/actions';

// TODO: fix file, class names
import Status from '../../../components/statusMessage/StatusMessage';

class CustomerMapper extends React.Component {
  static propTypes = {
    // Prop(s) passed by top level component, START
    Presenter: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    // Prop(s) passed by top level component, END

    routing: PropTypes.shape().isRequired,

    setCustomersAfterSearch: PropTypes.func.isRequired,
    fetchCustomers: PropTypes.func.isRequired,
    customerMapper: PropTypes.shape().isRequired,
    setPrevRouting: PropTypes.func.isRequired,
    setIsHandlingInputChange: PropTypes.func.isRequired,
    setCustomerWindow: PropTypes.func.isRequired,
    setInputFormVisibility: PropTypes.func.isRequired,
    setVehicleFormVisibility: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchCustomers();
  }

  componentWillUnmount() {
    this.props.setPrevRouting(this.props.routing);
    this.props.setInputFormVisibility(false);
  }

  render() {
    const {
      customerMapper: { api, app },
      Presenter,
      title,
      routing
    } = this.props;

    const {
      requestError, customers, customersByCityAndState, customersByZip
    } = api;

    const {
      prevRouting,
      isHandlingInputChange
    } = app;

    if (requestError) {
      return (
        <div>
          <Helmet><title>{title}</title></Helmet>
          <Status
            error
            content={requestError}
          />
        </div>
      );
    }

    return (
      <Presenter
        mapData={{
          title,
          routing,

          dataList: customers,
          customersByCityAndState,
          customersByZip,
          prevRouting,

          setCustomersAfterSearch: this.props.setCustomersAfterSearch,
          setInputFormVisibility: this.props.setInputFormVisibility,
          setVehicleFormVisibility: this.props.setVehicleFormVisibility,
          setCustomerWindow: this.props.setCustomerWindow,

          isHandlingInputChange,
          setIsHandlingInputChange: this.props.setIsHandlingInputChange
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    routing,
    apps: { customerMapper }
  } = state;

  return {
    routing,
    customerMapper
  };
};

export default connect(mapStateToProps, {
  setCustomersAfterSearch,

  fetchCustomers,
  setPrevRouting,
  setIsHandlingInputChange,
  setInputFormVisibility,
  setVehicleFormVisibility,
  setCustomerWindow
})(CustomerMapper);
