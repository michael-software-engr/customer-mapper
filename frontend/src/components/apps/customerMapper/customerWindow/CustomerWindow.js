
import React from 'react';
import PropTypes from 'prop-types';

import { Button, Menu, Grid, Icon } from 'semantic-ui-react';

import Left from './Left';

import RightTop from './RightTop';
import RightBottom from './RightBottom';

import '../../../../css/components/apps/customerMapper/customerWindow/CustomerWindow.css';

const getTabName = (vehicle) => {
  const { year, make, model } = vehicle;
  return [year, make, model].join(' ');
};

class CustomerWindow extends React.Component {
  static propTypes = {
    customerWindow: PropTypes.shape(),
    setCustomerWindow: PropTypes.func.isRequired,
    setIsHandlingInputChange: PropTypes.func.isRequired
  }
  static defaultProps = { customerWindow: null }

  state = { activeItem: null, currentVehicle: null }

  componentWillReceiveProps(nextProps) {
    const { customerWindow } = nextProps;
    if (!customerWindow) return;

    const { isVisible, customer } = customerWindow;
    if (!isVisible) return;
    if (!customer) return;

    const { vehicles } = customer;
    if (!customer.vehicles || customer.vehicles.length < 1) return;

    this.setState({
      activeItem: getTabName(vehicles[0]),
      currentVehicle: vehicles[0]
    });
  }

  handleItemClick = (evt, name, currentVehicle) => {
    this.setState({ activeItem: name, currentVehicle });
  }

  handleClose = () => {
    this.props.setIsHandlingInputChange(true);
    this.props.setCustomerWindow(null);
  }

  render() {
    const { customerWindow } = this.props;

    if (!customerWindow) return null;

    const { isVisible, customer } = customerWindow;

    if (!isVisible) return null;

    const { activeItem, currentVehicle } = this.state;

    return (
      <div className="CustomerWindow">
        <h3 className="header">
          <Icon name="window close" onClick={this.handleClose} />
          {customer.name}
        </h3>

        <div className="content">
          <Grid>
            <Grid.Column floated="left" className="left-customer-info" width={10}>
              <Grid.Row>
                Address: {customer.address}, {customer.city}, {customer.state} {customer.zip}
              </Grid.Row>
              <Grid.Row>
                Phone: {customer.phone}
              </Grid.Row>
            </Grid.Column>

            <Grid.Column floated="right" width={5}>
              <Grid.Row>
                email: <a href="mailto:email@example.org">email@example.org</a>
              </Grid.Row>

              <Grid.Row>
                <Button color="red">Purchase Customer</Button>
              </Grid.Row>
            </Grid.Column>
          </Grid>

          {
            customer.vehicles && customer.vehicles.length > 0 ? [
              <Menu attached="top" tabular key="top-menu">
                {
                  customer.vehicles.map((vehicle) => {
                    const tabName = getTabName(vehicle);

                    return (
                      <Menu.Item
                        key={['menu', vehicle.vin].join(':')}
                        name={tabName}
                        active={activeItem === tabName}
                        onClick={(evt, { name }) => { this.handleItemClick(evt, name, vehicle); }}
                      />
                    );
                  })
                }
              </Menu>,

              <Grid columns={2} divided key="grid-content">
                <Grid.Row stretched>
                  <Grid.Column width={4} className="left">
                    <Left vehicle={currentVehicle} />
                  </Grid.Column>

                  <Grid.Column width={12} className="right">
                    <RightTop />
                    <RightBottom className="bottom" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>,

              <Grid divided stretched columns="equal" key="grid-buttons" className="bottom-buttons">
                <Grid.Row>
                  {
                    ['Timeline', 'Set Rating', 'Set Follow Up', 'Add Note/Process'].map(title => (
                      <Grid.Column key={title}><a href={`/${title}`}>{title}</a></Grid.Column>
                    ))
                  }
                </Grid.Row>
              </Grid>
            ] : [<h4 key="h4-no-vehicles">No vehicles owned</h4>, <hr key="hr-no-vehicles" />]
          }
        </div>
      </div>
    );
  }
}

export default CustomerWindow;
