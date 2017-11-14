import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

import SearchInput from './SearchInput';

import formatForSearch from './formatForSearch';

export default class SearchCustomers extends Component {
  static propTypes = {
    customersByCityAndState: PropTypes.shape().isRequired,
    customersByZip: PropTypes.shape().isRequired,
    setCustomersAfterSearch: PropTypes.func.isRequired,
    setCustomerWindow: PropTypes.func.isRequired
  }

  handleResultSelect = ({ value, parameter }) => {
    if (!this.props[parameter]) {
      throw Error `No customers by [parameter] [${parameter}]`;
    }

    if (!this.props[parameter][value]) {
      throw Error `No customers by [parameter][value] [${parameter}][${value}]`;
    }

    this.props.setCustomerWindow(null);
    this.props.setCustomersAfterSearch(this.props[parameter][value]);
  }

  render() {
    const activeItem = 'byLocation';

    return (
      <Menu stackable borderless size="tiny" className="search">
        <Menu.Item name="byMessage" active={activeItem === 'byMessage'} onClick={this.handleItemClick} />
        <Menu.Item name="byLocation" active={activeItem === 'byLocation'} onClick={this.handleItemClick} />
        <Menu.Item name="byType" active={activeItem === 'byType'} onClick={this.handleItemClick} />
        <Menu.Item name="byVehicle" active={activeItem === 'byVehicle'} onClick={this.handleItemClick} />

        <Menu.Item position="right">
          <SearchInput
            source={formatForSearch(this.props.customersByCityAndState)}
            parameter="customersByCityAndState"
            handleResultSelect={this.handleResultSelect}
            otherProps={{
              placeholder: 'By city and state',
              className: 'by-city-and-state'
            }}
          />

          <SearchInput
            source={formatForSearch(this.props.customersByZip)}
            parameter="customersByZip"
            handleResultSelect={this.handleResultSelect}

            otherProps={{
              placeholder: 'Or by zip code',
              className: 'by-zip'
            }}
          />
        </Menu.Item>
      </Menu>
    );
  }
}
