import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import lodash from 'lodash';

import { setStatus, dismissStatus, showStatus } from '../../../redux/modules/apps/customerMapper/actions';

import {
  createVehicle
} from '../../../redux/modules/apps/customerMapper/api/actions';

import {
  setPrevRouting,
  setIsHandlingInputChange,
  setIsSubmitting,
  setVehicleFormVisibility
} from '../../../redux/modules/apps/customerMapper/app/actions';

import Status from './Status';
import VehicleFormPresenter from '../../../components/apps/customerMapper/forms/VehicleFormPresenter';

import lib from './lib';

class VehicleForm extends React.Component {
  static propTypes = {
    createVehicle: PropTypes.func.isRequired,
    customerMapper: PropTypes.shape().isRequired,

    routing: PropTypes.shape().isRequired,

    setPrevRouting: PropTypes.func.isRequired,

    setStatus: PropTypes.func.isRequired,
    dismissStatus: PropTypes.func.isRequired,
    showStatus: PropTypes.func.isRequired,

    setIsHandlingInputChange: PropTypes.func.isRequired,
    setIsSubmitting: PropTypes.func.isRequired,
    setVehicleFormVisibility: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleMaxMinimize = this.handleToggleMaxMinimize.bind(this);

    this.state = {
      formIsMinimized: false,

      customerId: null,
      year: null,
      make: null,
      model: null,

      trim: null,
      style: null,
      vin: null
    };
  }

  componentWillMount() {
    this.props.setIsSubmitting(false);
  }

  // componentDidMount() {
  //   this.props.setIsHandlingInputChange(false);
  // }

  componentWillUnmount() {
    this.props.setIsSubmitting(false);
    window.clearTimeout(this.timeout);
  }

  setNoEventsFound() {
    this.props.setStatus({
      header: 'Result',
      content: 'No events found.'
    });
    this.props.showStatus();
  }

  setEventsFound(eventsCount) {
    this.props.setStatus({
      header: 'Result',
      content: `${eventsCount} events found.`
    });
    this.props.showStatus();
  }

  handleInputChange(event, data) {
    const nextState = lodash.cloneDeep(this.state);

    if (event.target.name) {
      nextState[event.target.name] = event.target.value;
    } else if (data.name) {
      nextState[data.name] = data.value;
    } else {
      console.error({ event, data });
      throw Error('Terrible...');
    }

    this.setState(nextState);

    // ...
    this.props.setIsHandlingInputChange(true);
    this.props.setIsSubmitting(false);

    // Remove status display when a user starts typing new input.
    this.props.dismissStatus();
  }

  handleSubmit() {
    // event.preventDefault();
    // this.props.setIsHandlingInputChange(false);
    this.props.setIsSubmitting(true);

    this.props.setPrevRouting(this.props.routing);

    const {
      customerId,
      vin,
      year,
      make,
      model,

      trim,
      style
    } = this.state;

    const requiredInputs = ['customerId', 'vin', 'year', 'make', 'model'];
    if (lib.inputsNotValid(this.state, requiredInputs)) {
      this.props.setStatus({
        error: true,
        content: `Must fill all required inputs: ${requiredInputs.join(', ')}`
      });
      this.props.showStatus();
      return;
    }

    this.props.createVehicle({
      // customerId: customerId || 286,
      // year: year || 2018,
      // make: make || 'Vehicle Make',
      // model: model || 'Vehicle Model',
      // trim: trim || 'Vehicle Trim',
      // style: style || 'Vehicle Style',
      // vin: vin || 1002836234

      customerId,
      year,
      make,
      model,
      trim,
      style,
      vin
    });

    // this.props.setIsHandlingInputChange(true);
    this.props.setVehicleFormVisibility(false);
  }

  handleToggleMaxMinimize() {
    this.setState({ formIsMinimized: !this.state.formIsMinimized });
  }

  render() {
    const {
      customerMapper: { api, app, status }
    } = this.props;

    const {
      isVehicleFormVisible
    } = app;

    if (!isVehicleFormVisible) return null;

    const {
      handleInputChange, handleSubmit, handleToggleMaxMinimize
    } = this;

    const {
      formIsMinimized,

      customerId, year, trim, style, vin, make, model
    } = this.state;

    const formData = {
      customers: api.customers || [],
      Status,
      status,
      isVehicleFormVisible,

      handleInputChange,
      handleSubmit,
      handleToggleMaxMinimize,
      handleMessageDismiss: this.props.dismissStatus,
      setVehicleFormVisibility: this.props.setVehicleFormVisibility,
      setIsHandlingInputChange: this.props.setIsHandlingInputChange,

      formIsMinimized,

      customerId,
      year,
      make,
      model,

      trim,
      style,
      vin
    };

    return (
      <VehicleFormPresenter formData={formData} />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    routing,
    apps: { customerMapper },
  } = state;

  return {
    routing,
    customerMapper
  };
};

export default connect(mapStateToProps, {
  createVehicle,

  setPrevRouting,
  setIsHandlingInputChange,

  setStatus,
  dismissStatus,
  showStatus,

  setIsSubmitting,
  setVehicleFormVisibility
})(VehicleForm);
