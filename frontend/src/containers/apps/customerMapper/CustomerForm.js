import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import lodash from 'lodash';

import { setStatus, dismissStatus, showStatus } from '../../../redux/modules/apps/customerMapper/actions';

import {
  createCustomer,
  searchByJobId
} from '../../../redux/modules/apps/customerMapper/api/actions';

import {
  setPrevRouting,
  setIsHandlingInputChange,
  setIsPolling,
  setIsSubmitting,
  setInputFormVisibility
} from '../../../redux/modules/apps/customerMapper/app/actions';

import Status from './Status';
import CustomerFormPresenter from '../../../components/apps/customerMapper/forms/CustomerFormPresenter';

import lib from './lib';

class CustomerForm extends React.Component {
  static propTypes = {
    createCustomer: PropTypes.func.isRequired,
    searchByJobId: PropTypes.func.isRequired,
    customerMapper: PropTypes.shape().isRequired,

    routing: PropTypes.shape().isRequired,

    setPrevRouting: PropTypes.func.isRequired,

    setStatus: PropTypes.func.isRequired,
    dismissStatus: PropTypes.func.isRequired,
    showStatus: PropTypes.func.isRequired,

    setIsHandlingInputChange: PropTypes.func.isRequired,
    setIsPolling: PropTypes.func.isRequired,
    setIsSubmitting: PropTypes.func.isRequired,
    setInputFormVisibility: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleMaxMinimize = this.handleToggleMaxMinimize.bind(this);

    this.state = {
      formIsMinimized: false,

      name: null,
      email: null,
      phone: null,

      address: null,
      city: null,
      state: null,
      zip: null
    };
  }

  componentWillMount() {
    this.props.setIsSubmitting(false);
  }

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

  handleInputChange(event) {
    const nextState = lodash.cloneDeep(this.state);

    nextState[event.target.name] = event.target.value;

    this.setState(nextState);

    // ...
    this.props.setIsHandlingInputChange(true);
    this.props.setIsSubmitting(false);

    // Remove status display when a user starts typing new input.
    this.props.dismissStatus();
  }

  pollSearchByJobId(jobId) {
    // console.log('Polling', jobId);

    this.timeout = window.setTimeout(() => {
      this.props.searchByJobId(jobId).then((jobIdResp) => {
        const { customer } = jobIdResp.response;

        if (!customer) {
          this.pollSearchByJobId(jobId);
          return;
        }

        this.props.setInputFormVisibility(false);
        this.props.setIsPolling(false);
      });
    }, 2000);
  }

  handleSubmit() {
    // event.preventDefault();
    // this.props.setIsHandlingInputChange(false);
    this.props.setIsSubmitting(true);

    this.props.setPrevRouting(this.props.routing);

    const {
      name,
      email,
      phone,

      address,
      city,
      state,
      zip
    } = this.state;

    if (lib.inputsNotValid([name, phone, email, address, city, state, zip])) {
      this.props.setStatus({ error: true, content: 'Must fill all inputs.' });
      this.props.showStatus();
      return;
    }

    this.props.createCustomer({
      // name: name || 'Joe Carr',
      // email: email || 'email@example.org',
      // phone: phone || '(123) 456-7890',

      // address: address || '240 Mount Vernon Pl.',
      // city: city || 'Newark',
      // state: state || 'NJ',
      // zip: zip || 7106

      name,
      email,
      phone,

      address,
      city,
      state,
      zip
    }).then((json) => {
      if (!json) {
        this.props.setStatus({ error: true, content: 'No response from server.' });
        return;
      }

      const { error, response } = json;
      if (error) {
        this.props.setStatus({ error: true, content: error });
        return;
      }

      const { jobId } = response;
      if (!jobId) {
        this.props.setStatus({ error: true, content: 'Job id not returned.' });
        return;
      }

      this.props.setIsPolling(true);
      this.pollSearchByJobId(jobId);
    });

    // this.props.setIsHandlingInputChange(true);
  }

  handleToggleMaxMinimize() {
    this.setState({ formIsMinimized: !this.state.formIsMinimized });
  }

  render() {
    const {
      customerMapper: { app, status }
    } = this.props;

    const {
      inputFormIsVisibleGlobalControl,
      isPolling
    } = app;

    if (!inputFormIsVisibleGlobalControl) return null;

    const {
      handleInputChange, handleSubmit, handleToggleMaxMinimize
    } = this;

    const {
      formIsMinimized,

      name, address, city, state, zip, email, phone
    } = this.state;

    const formData = {
      Status,
      status,
      inputFormIsVisibleGlobalControl,

      handleInputChange,
      // Fix this and this ^^^^
      setIsHandlingInputChange: this.props.setIsHandlingInputChange,

      handleSubmit,
      handleToggleMaxMinimize,
      handleMessageDismiss: this.props.dismissStatus,
      setInputFormVisibility: this.props.setInputFormVisibility,

      isPolling,
      formIsMinimized,

      name,
      email,
      phone,

      address,
      city,
      state,
      zip
    };

    return (
      <CustomerFormPresenter formData={formData} />
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
  createCustomer,
  searchByJobId,

  setPrevRouting,
  setIsHandlingInputChange,

  setStatus,
  dismissStatus,
  showStatus,

  setIsPolling,
  setIsSubmitting,
  setInputFormVisibility
})(CustomerForm);
