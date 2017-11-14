import React from 'react';
import PropTypes from 'prop-types';

import {
  Button, Form, Input, Header, Icon
} from 'semantic-ui-react';

import '../../../../css/components/apps/customerMapper/forms/CustomerFormPresenter.css';

const baseClassName = 'CustomerFormPresenter';

const CustomerFormPresenter = ({ formData }) => {
  const {
    Status,
    status,

    handleInputChange,
    handleSubmit,
    setInputFormVisibility,
    setIsHandlingInputChange,

    // ???
    isPolling,

    name,
    email,
    phone,

    address,
    city,
    state,
    zip
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
            setInputFormVisibility(false);
          }}
        />

        <Header>
          <Icon name="add user" />
          <Header.Content>
            Add Customer
          </Header.Content>
        </Header>

        <Form.Group>
          <Form.Field>
            <label
              htmlFor="name"
              // className={error && 'error'}
            >
              Name
            </label>

            <Input
              id="name"
              placeholder="Name of customer"

              type="text"
              name="name"
              value={name || ''}
              autoComplete="on"
              onChange={handleInputChange}
            />
          </Form.Field>

          <Form.Input
            label="Phone"

            type="text"
            name="phone"
            value={phone || ''}
            autoComplete="on"
            onChange={handleInputChange}
          />

          <Form.Input
            label="Email"

            type="text"
            name="email"
            value={email || ''}
            autoComplete="on"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            width={16}
            label="Address"
            placeholder="123 Main St."

            // Warning: Form submission canceled because the form is not connected
            // https://github.com/erikras/redux-form/issues/2679
            type="text"
            name="address"
            value={address || ''}
            autoComplete="on"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            label="City"
            placeholder="New York"

            // Warning: Form submission canceled because the form is not connected
            // https://github.com/erikras/redux-form/issues/2679
            type="text"
            name="city"
            value={city || ''}
            autoComplete="on"
            onChange={handleInputChange}
          />

          <Form.Input
            label="State"
            placeholder="NY"

            type="text"
            name="state"
            value={state || ''}
            autoComplete="on"
            onChange={handleInputChange}
          />

          <Form.Input
            label="ZIP"
            placeholder="12345"

            type="text"
            name="zip"
            value={zip || ''}
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
