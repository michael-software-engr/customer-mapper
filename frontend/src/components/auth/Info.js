import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button, Icon, Image, List } from 'semantic-ui-react';

import moment from 'moment';

import defaultImg from './images/matthew.png';

const Info = ({ user, handleLogOut }) => {
  const {
    email, firstName, lastName,
    createdAt,
    countryCode,

    imageFileName
  } = user.data;

  const joinedIn = moment(createdAt).format('MMMM Do YYYY');

  const infoItems = [
    ['Email', email],
    ['Country', countryCode || 'US']
  ];

  return (
    <Card>
      <Image src={imageFileName || defaultImg} />
      <Card.Content>
        <Card.Header>
          {firstName}{' '}{lastName}
        </Card.Header>

        <Card.Meta>
          <span className="date">
            Joined in {joinedIn}
          </span>
        </Card.Meta>
        <Card.Description>
          <List>
            {
              infoItems.map(([label, value]) => (
                <List.Item key={label}>
                  <List.Header>{label}</List.Header>
                  {value}
                </List.Item>
              ))
            }
          </List>
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <a>
          <Icon name="group" />
          2 Teams
        </a>
      </Card.Content>

      <Button onClick={handleLogOut}>Sign out</Button>
    </Card>
  );
};

Info.propTypes = {
  user: PropTypes.shape().isRequired,
  handleLogOut: PropTypes.func.isRequired
};

export default Info;
