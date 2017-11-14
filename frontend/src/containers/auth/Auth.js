import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import lodash from 'lodash';

import { login } from '../../redux/modules/auth';

import AuthPresenter from '../../components/auth/AuthPresenter';

const emailInputName = 'emailInput';
const passwordInputName = 'passwordInput';

class Auth extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.shape().isRequired,

    // From top HOC
    handleLogOut: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleMessageDismiss = this.handleMessageDismiss.bind(this);

    this.state = {
      [emailInputName]: '', [passwordInputName]: ''
    };
  }

  handleInputChange(event) {
    // Get a deep clone of the component's state before the input change.
    const nextState = lodash.cloneDeep(this.state);

    // Update the state of the component
    nextState[event.target.name] = event.target.value;

    // Update the component's state with the new state
    this.setState(nextState);
  }

  handleLoginClick() {
    // e.preventDefault();

    const emailInput = this.state[emailInputName];
    const passwordInput = this.state[passwordInputName];

    this.setState({ isStatusDismissed: false });

    this.props.login({
      email: emailInput, password: passwordInput, remember_me: 1
    });
  }

  handleMessageDismiss() {
    this.setState({ isStatusDismissed: true });
  }

  render() {
    const {
      state,

      handleInputChange,
      handleLoginClick,

      handleMessageDismiss
    } = this;

    const {
      auth, handleLogOut
    } = this.props;

    const {
      emailInput, passwordInput, isStatusDismissed
    } = state;

    return (
      <AuthPresenter
        authData={{
          emailInputName,
          passwordInputName,
          emailInput,
          passwordInput,

          handleInputChange,
          handleLoginClick,
          handleLogOut,
          handleMessageDismiss,

          auth,

          isStatusDismissed
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    auth
  } = state;

  return {
    auth
  };
};

export default connect(mapStateToProps, {
  login
})(Auth);
