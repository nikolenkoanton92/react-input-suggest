/**
 * Module dependencies
 */

const React = require('react');

module.exports = React.createClass({

  /**
   * Setup Property Types
   */

  propTypes: {
    onChange: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
  },
  getDefaultProps() {
    placeholder: '';
  },

  getInitialState() {
    return {
      value: '',
      width: '5px',
    };
  },
  componentDidMount() {
    this.changeInputWidth();
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      const value = nextProps.value.trim();

      this.setState({
        value,
      });
      this.changeInputWidth();
    }
  },

  changeInputWidth() {
    const placeholder = this.props.placeholder;
    const value = this.state.value;
    let width = '5px';

    if (placeholder !== '' && value === '') {
      width = `${placeholder.length * 8}px`;
    } else if (placeholder !== '' || value !== '') {
      width = 'auto';
    }

    if (width !== this.state.width) {
      this.setState({
        width,
      });
    }
  },

  focus() {
    this.refs.input.focus();
  },

  render() {
    const style = {
      width: this.state.width,
    };
    return (
      <input
        ref="input" className="input-suggest-input"
        style={style}
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this.props.onChange}
        onKeyDown={this.props.onKeyDown}
        readOnly={this.props.readOnly}
        size={this.state.size}
      />
    );
  },
});
