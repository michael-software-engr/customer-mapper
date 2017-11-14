import React from 'react';
import PropTypes from 'prop-types';

import {
  Button, Form, Header, Icon
} from 'semantic-ui-react';

import { formatForSelect } from './lib';

import '../../../../css/components/apps/customerMapper/forms/CustomerFormPresenter.css';

const baseClassName = 'CustomerFormPresenter';

const CustomerFormPresenter = ({ formData }) => {
  const {
    customers,
    Status,
    status,

    handleInputChange,
    handleSubmit,
    setVehicleFormVisibility,
    setIsHandlingInputChange,

    isPolling,

    customerId,
    vin,
    year,
    make,
    model,

    trim,
    style
  } = formData;
  const { success, error } = status || {};

  return (
    // Must wrap Form so that it will overlay on the map properly.
    <div className={baseClassName}>
      <Form success={success} error={error}>
        <Button
          // Warning: Form submission canceled because the form is not connected
          // https://github.com/erikras/redux-form/issues/2679
          type="button"
          icon="window close"
          className="hide"
          onClick={() => {
            setIsHandlingInputChange(true);
            setVehicleFormVisibility(false);
          }}
        />

        <Header>
          <Icon name="car" />
          <Header.Content>
            Add Vehicle
          </Header.Content>
        </Header>

        <Form.Group widths="equal">
          <Form.Select
            name="customerId"
            value={customerId}

            options={formatForSelect(customers)}
            onChange={handleInputChange}

            label="Select customer"
            placeholder="Vehicle owner"
          />

          <Form.Input
            label="Vehicle Identification Number"

            type="text"
            name="vin"
            value={vin || ''}
            autoComplete="on"
            onChange={handleInputChange}
          />

        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            label="Year"

            type="text"
            name="year"
            value={year || ''}
            autoComplete="on"
            onChange={handleInputChange}
          />

          <Form.Input
            label="Make"

            type="text"
            name="make"
            value={make || ''}
            autoComplete="on"
            onChange={handleInputChange}
          />

          <Form.Input
            label="Model"

            type="text"
            name="model"
            value={model || ''}
            autoComplete="on"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            label="Trim"

            type="text"
            name="trim"
            value={trim || ''}
            autoComplete="on"
            onChange={handleInputChange}
          />

          <Form.Input
            label="Style"

            type="text"
            name="style"
            value={style || ''}
            autoComplete="on"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Button
          primary
          type="button"
          onClick={handleSubmit}

          loading={isPolling}

          className="submit-input"
        >
          Submit
        </Form.Button>

        <Status />
      </Form>
    </div>
  );
};

CustomerFormPresenter.propTypes = { formData: PropTypes.shape().isRequired };

export default CustomerFormPresenter;
