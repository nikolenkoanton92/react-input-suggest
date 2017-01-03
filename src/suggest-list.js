/**
 * Module dependencies
 */

const React = require('react');

const ListValue = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    onMouseMove: React.PropTypes.func,
    isFocused: React.PropTypes.bool,
    onKeyDown: React.PropTypes.func,
  },
  render() {
    const className = this.props.isFocused
      ? 'suggest-list-value is-focused' : 'suggest-list-value';

    return (
      <div
        className={className}
        onClick={this.props.onClick}
        onMouseMove={this.props.onMouseMove}
        onKeyDown={this.props.onKeyDown}
      >{this.props.name}</div>
    );
  },
});

module.exports = React.createClass({

  /**
   * Setup Property Types
   */

  propTypes: {
    suggestions: React.PropTypes.arrayOf(React.PropTypes.object),
    suggestValueFocus: React.PropTypes.number,
  },

  getInitialState() {
    return {
      isFocused: this.props.isFocused,
      suggestValueFocus: this.props.suggestValueFocus,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.suggestValueFocus !== this.state.suggestValueFocus) {
      this.setState({
        suggestValueFocus: nextProps.suggestValueFocus,
      });
    }
  },

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
  },
});
