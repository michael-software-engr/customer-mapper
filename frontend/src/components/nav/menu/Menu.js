import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import BurgerMenu from 'react-burger-menu';

import { Segment, Header, Icon, Button, Divider } from 'semantic-ui-react';

import LoggedIn from './LoggedIn';

import defaultImg from './images/rubyonrails.png';

import '../../../css/components/nav/menu/Menu.css';

const handleLinkClick = (
  // evt
) => {
  // ... enough to hide menu when a link is clicked as long as
  //   preventDefault is not invoked.
  // evt.preventDefault();
};

export default class Menu extends React.Component {
  static propTypes = {
    app: PropTypes.shape().isRequired,
    auth: PropTypes.shape().isRequired,
    // authRoute: PropTypes.shape().isRequired,
    authRoute: PropTypes.shape(),
    setInputFormVisibility: PropTypes.func.isRequired,
    setVehicleFormVisibility: PropTypes.func.isRequired,
    setCustomerWindow: PropTypes.func.isRequired,
    setIsHandlingInputChange: PropTypes.func.isRequired,

    handleLogOut: PropTypes.func.isRequired,

    routes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    outerContainerId: PropTypes.string.isRequired,
    pageWrapId: PropTypes.string.isRequired
  }

  static defaultProps = { authRoute: null }

  constructor(props) {
    super(props);

    this.state = {
      // stack
      // slide
      // bubble

      // elastic
      // push
      // pushRotate
      // scaleDown
      // scaleRotate
      // fallDown
      currentMenu: 'push',
      side: 'left'
    };
  }

  render() {
    const { currentMenu } = this.state;
    const BurgerMenuWithSelectedAnimation = BurgerMenu[currentMenu];

    const {
      app,

      auth,
      authRoute,

      routes,
      outerContainerId,
      pageWrapId,

      handleLogOut
    } = this.props;

    const { user } = auth;

    const authPath = authRoute && authRoute.path;

    return (
      <BurgerMenuWithSelectedAnimation
        id={currentMenu}
        outerContainerId={outerContainerId}
        pageWrapId={pageWrapId}
        isOpen={false}
      >
        <Segment className="user-segment">
          <div className="user-image">
            <img src={defaultImg} alt="User" />
          </div>

          <Header>
            {
              user ? [
                user.data.firstName, user.data.lastName
              ].join(' ') : app.usernameDefaultText
            }

            <Header.Subheader>{app.title}</Header.Subheader>
          </Header>
        </Segment>

        <hr />

        {
          routes.filter(({ noUrl }) => (!noUrl)).map(({ path, url, text, icon }) => (
            <Link to={url || path} key={path} onClick={handleLinkClick}>
              <Icon name={icon} />
              <span>{text}</span>
            </Link>
          ))
        }

        <Divider inverted />

        <Button onClick={() => {
          this.props.setIsHandlingInputChange(true);
          this.props.setCustomerWindow(null);
          this.props.setVehicleFormVisibility(false);
          this.props.setInputFormVisibility(true);
        }}
        >
          Add Customer
        </Button>

        <Divider hidden />

        <Button onClick={() => {
          this.props.setIsHandlingInputChange(true);
          this.props.setCustomerWindow(null);
          this.props.setInputFormVisibility(false);
          this.props.setVehicleFormVisibility(true);
        }}
        >
          Add Vehicle
        </Button>

        {
          user ? (
            <LoggedIn
              user={user}
              authRoute={authRoute}
              handleLogOut={handleLogOut}
              handleLinkClick={handleLinkClick}
            />
          ) : (
            authRoute && (
              <Link to={authPath} key={authPath} onClick={handleLinkClick}>
                <Icon name={authRoute.icon} />
                <span>{authRoute.notLoggedInText}</span>
              </Link>
            )
          )
        }
      </BurgerMenuWithSelectedAnimation>
    );
  }
}
