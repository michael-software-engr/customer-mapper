import React from 'react';
import PropTypes from 'prop-types';

import { Message } from 'semantic-ui-react';

const StatusPresenter = (props) => {
  const {
    customerMapper: { status },
    children,
    handleMessageDismiss
  } = props;

  if (!status) return null;

  if (status.dismissed) return null;

  if (status.error) {
    return (
      <Message
        error
        header={status.header}
        content={status.content}
        onDismiss={handleMessageDismiss}
      >
        { children }
      </Message>
    );
  }

  if (status && status.content) {
    return (
      <Message
        success={status.success}
        header={status.header}
        content={status.content}
        onDismiss={handleMessageDismiss}
      >
        { children }
      </Message>
    );
  }

  return null;
};

StatusPresenter.propTypes = {
  customerMapper: PropTypes.shape().isRequired,
  handleMessageDismiss: PropTypes.func.isRequired,
  children: PropTypes.node
};

StatusPresenter.defaultProps = {
  children: null
};

export default StatusPresenter;
