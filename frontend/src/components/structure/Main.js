import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

import '../../css/components/structure/Main.css';

const Main = ({ pageWrapId, children }) => (
  <main id={pageWrapId}>
    <Grid>
      {children}
    </Grid>
  </main>
);

Main.propTypes = {
  pageWrapId: PropTypes.string.isRequired,
  children: PropTypes.node
};

Main.defaultProps = {
  children: null
};

export default Main;
