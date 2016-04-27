/**
 * Module dependencies
 */

var React = require('react')

/**
 * expose React Input Suggest component
 */

module.exports = React.createClass({

  /**
   * Setup Property Types
   */

  propTypes: {
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    keys: React.PropTypes.object,
    readOnly: React.PropTypes.bool
  },

  /**
   * Set Default Props Value
   */

  getDefaultProps: function() {
    return {
      placeholder: 'Add new tag',
      keys: {
        ENTER: 13,
        TAB: 9,
        BACKSPACE: 8,
        UP_ARROW: 38,
        DOWN_ARROW: 40,
        ESCAPE: 27
      },
      readOnly: false
    }
  },

  /**
   * Set Default State Value
   */

  getInitialState: function() {
    return {
      inputValue: ''
    }
  },

  handleInputChange: function(event) {},

  handleKeyDown: function(event) {},

  render: function() {
    return (
      <div ref="wrapper" className="input-suggest-wrapper">
      <div className="input-suggest-value">
        <span className="input-suggest-label">family</span>
        <span className="input-sugges-value-icon">x</span>
      </div>
      <input className="input-suggest-input"
      onChange={this.props.onChange}
      placeholder={this.props.placeholder}
      onChange={this.handleInputChange}
      onKeyDown={this.handleKeyDown}
      readOnly={this.props.readOnly}
      />
      </div>
      )
  }
})
