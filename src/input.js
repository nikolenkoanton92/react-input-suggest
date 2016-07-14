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
    placeholder: ''
  },

  getInitialState: function() {
    return {
      value: '',
      width: '5px'
    }
  },
  componentDidMount: function() {
    this.changeInputWidth()
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value !== this.state.value) {
      var value = nextProps.value.trim()

      this.setState({
        value: value
      })
      this.changeInputWidth()

    }
  },

  changeInputWidth: function() {
    var placeholder = this.props.placeholder
    var value = this.state.value
    var width = '5px'

    if (placeholder !== '' && value === '') {
      width = (placeholder.length * 8) + 'px'
    } else if (placeholder !== '' || value !== '') {
      width = 'auto'
    }

    if (width !== this.state.width) {
      this.setState({
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
