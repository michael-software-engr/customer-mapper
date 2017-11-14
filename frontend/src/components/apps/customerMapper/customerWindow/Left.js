
import React from 'react';
import PropTypes from 'prop-types';

import { Segment, Image, List } from 'semantic-ui-react';

import carImage from './images/car.jpg';

const Left = ({ vehicle }) => (
  vehicle &&
  <Segment className="vehicle-info">
    <Image src={carImage} height={80} />
    <List>
      {
        [
          ['Style', vehicle.style],
          ['Trim Level', vehicle.trim],
          ['Engine', ''],
          ['Transmission', ''],
          ['Miles', ''],
          ['MPG', ''],
          ['VIN', vehicle.vin]
        ].map(([title, value]) => (
          <List.Item active key={`${title}${value}`}>{title}: {value}</List.Item>
        ))
      }
    </List>
  </Segment>
);

Left.propTypes = {
  vehicle: PropTypes.shape()
};

Left.defaultProps = {
  vehicle: null
};

export default Left;
