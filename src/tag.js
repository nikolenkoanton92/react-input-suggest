/**
 * Module dependencies
 */

var React = require('react')

module.exports = React.createClass({

  /**
   * Setup Property Types
   */

  propTypes: {
    index: React.PropTypes.number,
    label: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    onRemove: React.PropTypes.func
  },

  onRemove: function(event) {
    event.preventDefault()
    this.props.onRemove(this.props.index)
  },

  render: function() {
    return (
      <div className="input-suggest-value">
          <span className="input-suggest-label">{this.props.label}</span>
          <span className="input-sugges-value-icon" onClick={this.onRemove}>x</span>
      </div>
      )
  }
})
