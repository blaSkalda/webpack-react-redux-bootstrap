// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Layout extends Component {
  renderLayout() {
    const {
      children,
    } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }

  render() {
    return this.renderLayout();
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
