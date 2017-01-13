'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Module dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ListValue = function ListValue(props) {
  var className = props.isFocused ? 'suggest-list-value is-focused' : 'suggest-list-value';
  return _react2.default.createElement(
    'div',
    {
      className: className,
      onClick: props.onClick,
      onMouseMove: props.onMouseMove,
      onKeyDown: props.onKeyDown
    },
    props.name
  );
};

ListValue.propTypes = {
  name: _react2.default.PropTypes.string.isRequired,
  onClick: _react2.default.PropTypes.func,
  onMouseMove: _react2.default.PropTypes.func,
  isFocused: _react2.default.PropTypes.bool,
  onKeyDown: _react2.default.PropTypes.func
};

var SuggestList = function (_Component) {
  _inherits(SuggestList, _Component);

  function SuggestList(props) {
    _classCallCheck(this, SuggestList);

    var _this = _possibleConstructorReturn(this, (SuggestList.__proto__ || Object.getPrototypeOf(SuggestList)).call(this, props));

    _this.state = {
      isFocused: _this.props.isFocused,
      suggestValueFocus: _this.props.suggestValueFocus
    };
    return _this;
  }

  _createClass(SuggestList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.suggestValueFocus !== this.state.suggestValueFocus) {
        this.setState({
          suggestValueFocus: nextProps.suggestValueFocus
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;

      var list = this.props.suggestions && this.props.suggestions.map(function (el, idx) {
        var isFocused = self.state.suggestValueFocus === idx;

        return _react2.default.createElement(ListValue, {
          key: idx,
          name: el[self.props.valueName],
          onClick: self.props.onClick.bind(null, el[self.props.valueName]),
          onMouseMove: self.props.onMouseMove.bind(null, idx),
          isFocused: isFocused
        });
      });

      return _react2.default.createElement(
        'div',
        { className: 'suggest-list-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'suggest-list' },
          list
        )
      );
    }
  }]);

  return SuggestList;
}(_react.Component);

/**
 * Setup Property Types
 */


SuggestList.propTypes = {
  suggestions: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
  suggestValueFocus: _react2.default.PropTypes.number,
  isFocused: _react2.default.PropTypes.bool
};

exports.default = SuggestList;