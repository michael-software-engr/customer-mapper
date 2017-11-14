import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Icon } from 'semantic-ui-react';

import AuthLink from './AuthLink';

import '../../../css/components/nav/navBar/NavBar.css';

class NavBar extends React.Component {
  static propTypes = {
    auth: PropTypes.shape().isRequired,
    authRoute: PropTypes.shape().isRequired,

    left: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    right: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      display: 'none' // 'block'
    };
  }

  toggleMenu() {
    const currentState = this.state.display;
    const nextState = currentState === 'none' ? 'block' : 'none';

    this.setState({ ...this.state, display: nextState });
  }

  render() {
    const {
      left,
      right,
      auth,
      authRoute
    } = this.props;

    const { display } = this.state;

    const { user } = auth || {};

    return (
      <nav className="NavBar">
        <div className="wide">
          <ul className="left">
            {
              left.map(({ path, text }) => (
                <li key={`${path}-${text}`}><Link to={path}>{text}</Link></li>
              ))
            }
          </ul>

          <ul className="right">
            {
              [
                right.map(({ path, text }) => (
                  <li key={`${path}-${text}`}><Link to={path}>{text}</Link></li>
                )),

                <AuthLink user={user} authRoute={authRoute} key={authRoute} />
              ]
            }
          </ul>
        </div>

        <div className="narrow">
          <button onClick={this.toggleMenu}>
            <Icon name="sidebar" />
          </button>

          <ul style={{ display }}>
            {
              [
                left.concat(right).map(({ path, text }) => (
                  <li key={`${path}-${text}`}><Link to={path}>{text}</Link></li>
                )),

                <AuthLink user={user} authRoute={authRoute} key={authRoute} />
              ]
            }
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
