import React from 'react';
import PropTypes from 'prop-types';

import { Message } from 'semantic-ui-react';

import '../../css/components/statusMessage/StatusMessage.css';

const getStatus = (success, error) => {
  const successClassName = success ? ' success' : null;

  return {
    className: (successClassName || (error ? ' error' : '')),
    defaultHeader: (success && 'Success') || (error && 'Error') || 'Status'
  };
};

class StatusMessage extends React.Component {
  static propTypes = {
    success: PropTypes.bool,
    error: PropTypes.bool,
    header: PropTypes.string,
    content: PropTypes.string,

    children: PropTypes.node,
    callBacks: PropTypes.arrayOf(PropTypes.shape())
  }

  static defaultProps = {
    success: false,
    error: false,
    header: '',
    content: '',

    children: null,
    callBacks: []
  }

  constructor(props) {
    super(props);
    this.handleMessageDismiss = this.handleMessageDismiss.bind(this);

    props.callBacks.forEach((callBack) => {
      callBack.func.apply(this, callBack.args);
    });

    this.state = {
      dismissed: false
    };
  }

  handleMessageDismiss() {
    this.setState({ dismissed: true });
  }

  render() {
    const {
      success,
      error,
      header,
      content,
      children
    } = this.props;

    const { state, handleMessageDismiss } = this;

    const status = getStatus(success, error);

    return (
      <div className={`StatusMessage${status.className}`}>
        <Message
          success={!!success}
          error={!!error}
          hidden={(!success && !error) && state.dismissed}

          header={header || status.defaultHeader}
          content={content}

          onDismiss={handleMessageDismiss}
        />
        {
          children && (
            <div className="children">
              {children}
            </div>
          )
        }
      </div>
    );
  }
}

export default StatusMessage;
