/**
 * Module dependencies
 */

var React = require('react')

module.exports = React.createClass({
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      var value = nextProps.value.trim()
      var width = value !== '' ? 'auto' : '5px'
      this.setState({
        value: value,
        width: width
      })
    }
  },

  render: function() {
    var style = {
      width: this.state.width
    }

    return (
      <input  className="input-suggest-input"
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
