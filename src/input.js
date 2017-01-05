/**
 * Module dependencies
 */
import React, { Component } from 'react';

// const React = require('react');

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      width: '5px',
    };

    this.changeInputWidth = this.changeInputWidth.bind(this);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    this.changeInputWidth();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      const value = nextProps.value.trim();

      this.setState({
        value,
      });
      this.changeInputWidth();
    }
  }

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
  }

  focus() {
    this.input.focus();
  }

  render() {
    const style = {
      width: this.state.width,
    };
    return (
      <input
        ref={(input) => { this.input = input; }}
        className="input-suggest-input"
        style={style}
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this.props.onChange}
        onKeyDown={this.props.onKeyDown}
        readOnly={this.props.readOnly}
        size={this.state.size}
      />
    );
  }
}

/**
 * Setup Property Types
 */
Input.propTypes = {
  onChange: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
};

/**
 * Set Default Props Value
 */
Input.defaultProps = {
  placeholder: '',
};

export default Input;
