
import React from 'react';
// import PropTypes from 'prop-types';

import { Segment, Icon, Grid, Table, Button } from 'semantic-ui-react';

class RightTop extends React.Component {
  // static propTypes = {
  // }
  // static defaultProps = { }

  state = { crmButton: {
    positive: false, negative: true, text: 'Not Synced with CRM'
  } }

  crm = () => {
    const { positive, negative } = this.state.crmButton;

    this.setState({
      crmButton: {
        positive: !positive,
        negative: !negative,
        text: positive ? 'Not Synced with CRM' : 'Synced with CRM'
      }
    });
  }

  render() {
    return (
      <Segment className="top">
        <Grid>
          <Grid.Column width={4} className="left-sub">
            <Table>
              <Table.Body>
                <Table.Row>
                  {
                    [
                      ['block layout', 'Build', '/build'],
                      ['time', '...', '/schedule'],
                      ['key', 'Buy It', '/buy']
                    ].map(([icon, title, link]) => (
                      <Table.Cell key={[icon, title, link].join(':')}>
                        <a href={link}>
                          <div>
                            <Icon name={icon} size="big" />
                          </div>
                          <div>
                            {title}
                          </div>
                        </a>
                      </Table.Cell>
                    ))
                  }
                </Table.Row>
              </Table.Body>
            </Table>

            <Button
              fluid
              positive={this.state.crmButton.positive}
              negative={this.state.crmButton.negative}
              className="crm-button"
              onClick={this.crm}
            >
              {this.state.crmButton.text}
            </Button>
          </Grid.Column>

          <Grid.Column width={8} className="middle-sub">
            <Table>
              <Table.Body>
                {
                  [
                    [
                      { icon: 'dollar', topText: 'Payment', bottomText: '$ 360', link: '/payment' },
                      { icon: 'calendar', topText: 'Term', bottomText: '72/65', link: '/term' },
                      { icon: 'checkmark box', topText: 'Payoff', bottomText: '$ 23,4000', link: '/payoff' }
                    ],

                    [
                      { icon: 'flag', topText: 'APR Rate', bottomText: '%15.44', link: '/apr' },
                      { icon: 'wrench', topText: 'Mo. Repair', bottomText: '-', link: '/mo-repair' },
                      { icon: 'dollar', topText: 'Mo. Fuel', bottomText: '-', link: '/mo-fuel' }
                    ]
                  ].map((list, ix) => (
                    /* eslint-disable react/no-array-index-key */
                    <Table.Row key={ix}>
                      {
                        list.map(({ icon, topText, bottomText, link }) => [
                          <Table.Cell
                            key={['icon', icon, topText, bottomText].join(':')}
                          >
                            <a href={link}><Icon name={icon} size="big" /></a>
                          </Table.Cell>,

                          <Table.Cell
                            key={['text', icon, topText, bottomText].join(':')}
                          >
                            {topText} <br />
                            {bottomText}
                          </Table.Cell>
                        ])
                      }
                    </Table.Row>
                    /* eslint-enable react/no-array-index-key */
                  ))
                }
              </Table.Body>
            </Table>
          </Grid.Column>

          <Grid.Column width={4} className="right-sub">
            <Table celled>
              <Table.Body>
                {
                  [
                    ['Rough', '$ 5,605'],
                    ['Avg.', '$ 6,024'],
                    ['Clean', '$ 6,412'],
                    ['Equity', '$ 820']
                  ].map(([key, value]) => (
                    <Table.Row key={[key, value].join(':')}>
                      <Table.Cell>{key}</Table.Cell><Table.Cell>{value}</Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default RightTop;
