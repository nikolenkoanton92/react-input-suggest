/**
 * Module dependencies
 */

import React, { Component } from 'react';

const ListValue = function ListValue(props) {
  const className = props.isFocused
      ? 'suggest-list-value is-focused' : 'suggest-list-value';
  return (
    <div
      className={className}
      onClick={props.onClick}
      onMouseMove={props.onMouseMove}
      onKeyDown={props.onKeyDown}
    >{props.name}</div>
  );
};


ListValue.propTypes = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  onMouseMove: React.PropTypes.func,
  isFocused: React.PropTypes.bool,
  onKeyDown: React.PropTypes.func,
};


class SuggestList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: this.props.isFocused,
      suggestValueFocus: this.props.suggestValueFocus,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.suggestValueFocus !== this.state.suggestValueFocus) {
      this.setState({
        suggestValueFocus: nextProps.suggestValueFocus,
      });
    }
  }

  render() {
    const self = this;

    const list = this.props.suggestions && this.props.suggestions.map((el, idx) => {
      const isFocused = (self.state.suggestValueFocus === idx);

      return (
        <ListValue
          key={idx}
          name={el[self.props.valueName]}
          onClick={self.props.onClick.bind(null, el[self.props.valueName])}
          onMouseMove={self.props.onMouseMove.bind(null, idx)}
          isFocused={isFocused}
        />
      );
    });

    return (
      <div className="suggest-list-wrapper">
        <div className="suggest-list">
          {list}
        </div>
      </div>
    );
  }
}

/**
 * Setup Property Types
 */
SuggestList.propTypes = {
  suggestions: React.PropTypes.arrayOf(React.PropTypes.object),
  suggestValueFocus: React.PropTypes.number,
  isFocused: React.PropTypes.bool,
};

export default SuggestList;
