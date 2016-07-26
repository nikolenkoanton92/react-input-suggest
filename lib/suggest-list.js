'use strict';

/**
 * Module dependencies
 */

var React = require('react');

var ListValue = React.createClass({
  displayName: 'ListValue',


  propTypes: {
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    onMouseMove: React.PropTypes.func,
    isFocused: React.PropTypes.bool,
    valueName: React.PropTypes.string
  },
  render: function render() {
    var className = this.props.isFocused ? 'suggest-list-value is-focused' : 'suggest-list-value';
    return React.createElement(
      'div',
      { className: className,
        onClick: this.props.onClick,
        onMouseMove: this.props.onMouseMove,
        onKeyDown: this.props.onKeyDown },
      this.props.name
    );
  }
});

module.exports = React.createClass({
  displayName: 'exports',


  /**
   * Setup Property Types
   */

  propTypes: {
    suggestions: React.PropTypes.array,
    suggestValueFocus: React.PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {
      isFocused: this.props.isFocused,
      suggestValueFocus: this.props.suggestValueFocus
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.suggestValueFocus !== this.state.suggestValueFocus) {
      this.setState({
        suggestValueFocus: nextProps.suggestValueFocus
      });
    }
  },

  render: function render() {
    var self = this;

    var list = this.props.suggestions && this.props.suggestions.map(function (el, idx) {

      var isFocused = self.state.suggestValueFocus === idx ? true : false;
      return React.createElement(ListValue, {
        key: idx,
        name: el[self.props.valueName],
        onClick: self.props.onClick.bind(null, idx),
        onMouseMove: self.props.onMouseMove.bind(null, idx),
        isFocused: isFocused
      });
    });

    return React.createElement(
      'div',
      { className: 'suggest-list-wrapper' },
      React.createElement(
        'div',
        { className: 'suggest-list' },
        list
      )
    );
  }
});