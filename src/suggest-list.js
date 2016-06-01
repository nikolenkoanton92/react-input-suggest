/**
 * Module dependencies
 */

var React = require('react')

var ListValue = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    onMouseMove: React.PropTypes.func,
    isFocused: React.PropTypes.bool
  },
  render: function() {
    var className = this.props.isFocused ? 'suggest-list-value is-focused' : 'suggest-list-value'
    return (
      <div className={className}
      onClick={this.props.onClick}
      onMouseMove={this.props.onMouseMove}
      onKeyDown={this.props.onKeyDown}>{this.props.name}</div>
      )
  }
})

module.exports = React.createClass({

  /**
   * Setup Property Types
   */

  propTypes: {
    suggestions: React.PropTypes.array,
    suggestValueFocus: React.PropTypes.number
  },

  getInitialState: function() {
    return {
      isFocused: this.props.isFocused,
      suggestValueFocus: this.props.suggestValueFocus
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.suggestValueFocus !== this.state.suggestValueFocus) {
      this.setState({
        suggestValueFocus: nextProps.suggestValueFocus
      })
    }
  },

  render: function() {
    var self = this
    var list = this.props.suggestions && this.props.suggestions.map(function(el, idx) {

        var isFocused = (self.state.suggestValueFocus === idx) ? true : false

        return (
          <ListValue
          key={idx}
          name={el.name}
          onClick={self.props.onClick.bind(null, idx)}
          onMouseMove={self.props.onMouseMove.bind(null, idx)}
          isFocused={isFocused}
          />
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
