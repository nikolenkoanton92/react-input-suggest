"use strict";

/**
 * Module dependencies
 */

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",


  /**
   * Setup Property Types
   */

  propTypes: {
    index: React.PropTypes.number,
    label: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    onRemove: React.PropTypes.func
  },

  onRemove: function onRemove(event) {
    event.preventDefault();
    this.props.onRemove(this.props.index);
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "input-suggest-value" },
      React.createElement(
        "span",
        { className: "input-suggest-label" },
        this.props.label
      ),
      React.createElement(
        "span",
        { className: "input-sugges-value-icon", onClick: this.onRemove },
        "x"
      )
    );
  }
});