/**
 * Module dependencies
 */

var React = require('react')

var ListValue = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func
  },
  render: function() {
    return (
      <div className="suggest-list-value" onClick={this.props.onClick}>{this.props.name}</div>
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
    var self = this
    var list = this.props.suggestions && this.props.suggestions.map(function(el, idx) {
        return (
          <ListValue key={idx} name={el.name} onClick={self.props.onClick.bind(null, idx)}/>
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
