import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Search } from 'semantic-ui-react';

import lodash from 'lodash';

export default class SearchInput extends Component {
  static propTypes = {
    source: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    parameter: PropTypes.string.isRequired,
    handleResultSelect: PropTypes.func.isRequired,
    otherProps: PropTypes.shape().isRequired
  }
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: '' });
  }

  handleResultSelect = (e, { result }) => {
    this.props.handleResultSelect({
      value: result.title, parameter: this.props.parameter
    });
    this.setState({ value: result.title });
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) {
        this.resetComponent();
        return;
      }

      const re = new RegExp(lodash.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: lodash.filter(this.props.source, isMatch)
      });
    }, 500);
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}

        {...this.props.otherProps}
      />
    );
  }
}
