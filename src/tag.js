/**
 * Module dependencies
 */

import React, { Component } from 'react';

class Tag extends Component {

  constructor(props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
  }

  onRemove(event) {
    event.preventDefault();
    this.props.onRemove(this.props.index);
  }

  render() {
    return (
      <div className="input-suggest-value">
        <span className="input-suggest-label">{this.props.label}</span>
        <span className="input-sugges-value-icon" onClick={this.onRemove}>
          x
        </span>
      </div>
    );
  }
}

/**
 * Setup Property Types
 */
Tag.propTypes = {
  index: React.PropTypes.number,
  label: React.PropTypes.string.isRequired,
  onRemove: React.PropTypes.func,
};

export default Tag;
