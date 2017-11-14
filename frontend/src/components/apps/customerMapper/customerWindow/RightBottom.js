import React from 'react';
// import PropTypes from 'prop-types';

import Clock from 'react-live-clock';

import { Checkbox, Segment, Grid } from 'semantic-ui-react';

const date = new Date();

const RightBottom = () => (
  <Segment className="bottom">
    <Grid columns="equal">
      <Grid.Column>
        {
          [
            ['Last Service', '10/11/2017'],
            ['Sale Date', '12/31/2016']
          ].map(([key, value]) => (
            <Grid.Row key={[key, value].join(':')}><a href="/">{key}:</a> {value}</Grid.Row>
          ))
        }
      </Grid.Column>

      <Grid.Column>
        {
          [
            ['Recent Service', true],
            ['Received Marketing', false]
          ].map(([key, checked]) => (
            <Grid.Row key={[key, checked ? 'checked' : 'notChecked'].join(':')}>
              <Checkbox label={key} defaultChecked={checked} />
            </Grid.Row>
          ))
        }
      </Grid.Column>

      <Grid.Column>
        {
          [
            ['Log In To Portal', true],
            ['On Do Not Call', true]
          ].map(([key, checked]) => (
            <Grid.Row key={[key, checked ? 'checked' : 'notChecked'].join(':')}>
              <Checkbox label={key} defaultChecked={checked} />
            </Grid.Row>
          ))
        }
      </Grid.Column>

      <Grid.Column>
        <div>{date.toDateString()}</div>
        <Clock format="hh:mm:ssa" ticking />
      </Grid.Column>
    </Grid>
  </Segment>
);

export default RightBottom;
