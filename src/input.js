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
      value: ''
    }
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      })
    }
  },
  render: function() {
    return (
      <input  className="input-suggest-input"
      placeholder={this.props.placeholder}
      value={this.state.value}
      onChange={this.props.onChange}
      onKeyDown={this.props.onKeyDown}
      readOnly={this.props.readOnly}
      />

      )
  }
})
