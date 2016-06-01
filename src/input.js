/**
 * Module dependencies
 */

var React = require('react')

module.exports = React.createClass({

  /**
   * Setup Property Types
   */

  propTypes: {
    onChange: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    placeholder: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      value: ''

    }
  },
  getInitialState: function() {
    return {
      value: '',
      width: '5px'
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value !== this.state.value) {
      var value = nextProps.value.trim()
      var width = value !== '' ? 'auto' : '5px'
      this.setState({
        value: value,
        width: width
      })
    }
  },

  focus: function() {
    this.refs.input.focus()
  },

  render: function() {
    var style = {
      width: this.state.width
    }

    return (
      <input  ref="input" className="input-suggest-input"
      style={style}
      placeholder={this.props.placeholder}
      value={this.state.value}
      onChange={this.props.onChange}
      onKeyDown={this.props.onKeyDown}
      readOnly={this.props.readOnly}
      size={this.state.size}
      />

      )
  }
})
