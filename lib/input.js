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


var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.state = {
      value: '',
      width: '5px'
    };

    _this.changeInputWidth = _this.changeInputWidth.bind(_this);
    _this.focus = _this.focus.bind(_this);
    return _this;
  }

  _createClass(Input, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.changeInputWidth();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
        var value = nextProps.value.trim();

        this.setState({
          value: value
        });
        this.changeInputWidth();
      }
    }
  }, {
    key: 'changeInputWidth',
    value: function changeInputWidth() {
      var placeholder = this.props.placeholder;
      var value = this.state.value;
      var width = '5px';

      if (placeholder !== '' && value === '') {
        width = placeholder.length * 8 + 'px';
      } else if (placeholder !== '' || value !== '') {
        width = 'auto';
      }

      if (width !== this.state.width) {
        this.setState({
          width: width
        });
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = {
        width: this.state.width
      };
      return _react2.default.createElement('input', {
        ref: function ref(input) {
          _this2.input = input;
        },
        className: 'input-suggest-input',
        style: style,
        placeholder: this.props.placeholder,
        value: this.state.value,
        onChange: this.props.onChange,
        onKeyDown: this.props.onKeyDown,
        readOnly: this.props.readOnly,
        size: this.state.size
      });
    }
  }]);

  return Input;
}(_react.Component);

/**
 * Setup Property Types
 */


Input.propTypes = {
  onChange: _react2.default.PropTypes.func,
  onKeyDown: _react2.default.PropTypes.func,
  placeholder: _react2.default.PropTypes.string,
  readOnly: _react2.default.PropTypes.bool
};

/**
 * Set Default Props Value
 */
Input.defaultProps = {
  placeholder: ''
};

exports.default = Input;