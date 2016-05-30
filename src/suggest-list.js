/**
 * Module dependencies
 */

var React = require('react')

var ListValue = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="suggest-list-value">{this.props.name}</div>
      )
  }
})

module.exports = React.createClass({

  /**
   * Setup Property Types
   */

  propTypes: {
    suggestions: React.PropTypes.array
  },

  render: function() {
    var list = this.props.suggestions && this.props.suggestions.map(function(el, idx) {
        return (
          <ListValue key={idx} name={el.name} />
          )
    })

    return (
      <div className="suggest-list-wrapper">
        <div className="suggest-list">
          {list}
        </div>
      </div>
      )
  }
})
