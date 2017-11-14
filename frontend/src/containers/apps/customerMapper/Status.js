import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StatusPresenter from '../../../components/apps/customerMapper/forms/StatusPresenter';

import {
  setStatus,
  dismissStatus
} from '../../../redux/modules/apps/customerMapper/actions';

import { areStatusesEqual } from '../../../redux/modules/apps/customerMapper/lib/status';

class Status extends React.Component {
  static propTypes = {
    setStatus: PropTypes.func.isRequired,
    dismissStatus: PropTypes.func.isRequired,
    customerMapper: PropTypes.shape().isRequired,
    children: PropTypes.node
  }

  static defaultProps = {
    children: null
  }

  componentWillReceiveProps(nextProps) {
    const {
      customerMapper: { api, status }
    } = nextProps;

    if (status.error) return;

    if (!api.meetupEvents || api.meetupEvents.length === 0) return;

    if (status.dismissed) return;

    if (api.status && api.status.content) {
      if (areStatusesEqual(api.status, status)) return;

      this.props.setStatus(api.status);
    }
  }

  render() {
    const { customerMapper, children } = this.props;

    return (
      <StatusPresenter
        customerMapper={customerMapper}
        handleMessageDismiss={this.props.dismissStatus}
      >
        { children }
      </StatusPresenter>
    );
  }
}

const mapStateToProps = (state) => {
  const { apps: { customerMapper } } = state;

  return {
    customerMapper
  };
};

export default connect(mapStateToProps, {
  setStatus,
  dismissStatus
})(Status);
