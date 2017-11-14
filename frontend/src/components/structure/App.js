import React from 'react';
import PropTypes from 'prop-types';

import '../../css/components/structure/App.css';

const App = ({ outerContainerId, children }) => (
  <div id={outerContainerId}>{children}</div>
);

App.propTypes = {
  outerContainerId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default App;
