(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-input-suggest"] = factory(require("react"));
	else
		root["react-input-suggest"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _tag = __webpack_require__(4);

	var _tag2 = _interopRequireDefault(_tag);

	var _input = __webpack_require__(2);

	var _input2 = _interopRequireDefault(_input);

	var _suggestList = __webpack_require__(3);

	var _suggestList2 = _interopRequireDefault(_suggestList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Module dependencies
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	/**
	 * expose React Input Suggest component
	 */

	var ReactInputSuggest = function (_Component) {
	  _inherits(ReactInputSuggest, _Component);

	  function ReactInputSuggest(props) {
	    _classCallCheck(this, ReactInputSuggest);

	    var _this = _possibleConstructorReturn(this, (ReactInputSuggest.__proto__ || Object.getPrototypeOf(ReactInputSuggest)).call(this, props));

	    _this.state = {
	      inputValue: '',
	      tags: [],
	      isOpen: false,
	      suggestions: _this.props.suggestions,
	      suggestValueFocus: 0
	    };

	    _this.addNewTag = _this.addNewTag.bind(_this);
	    _this.clearInputValue = _this.clearInputValue.bind(_this);
	    _this.removeTag = _this.removeTag.bind(_this);
	    _this.focus = _this.focus.bind(_this);
	    _this.blur = _this.blur.bind(_this);
	    _this.handleClickOnWrapper = _this.handleClickOnWrapper.bind(_this);
	    _this.openSuggestionList = _this.openSuggestionList.bind(_this);
	    _this.closeSuggestionList = _this.closeSuggestionList.bind(_this);
	    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
	    _this.handleInputChange = _this.handleInputChange.bind(_this);
	    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
	    _this.handleArrowDown = _this.handleArrowDown.bind(_this);
	    _this.handleArrowUp = _this.handleArrowUp.bind(_this);
	    _this.handleClickOnSuggestion = _this.handleClickOnSuggestion.bind(_this);
	    _this.renderDropdown = _this.renderDropdown.bind(_this);
	    _this.handleMouseDownArrow = _this.handleMouseDownArrow.bind(_this);
	    _this.filterSuggestions = _this.filterSuggestions.bind(_this);
	    _this.resetSuggestions = _this.resetSuggestions.bind(_this);
	    _this.renderSuggestList = _this.renderSuggestList.bind(_this);
	    return _this;
	  }

	  _createClass(ReactInputSuggest, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.suggestions !== this.state.suggestions) {
	        this.setState({
	          suggestions: nextProps.suggestions.concat([])
	        });
	      }
	    }

	    /**
	    * add new tag
	    * @param {String} tag
	    */

	  }, {
	    key: 'addNewTag',
	    value: function addNewTag(tag) {
	      this.clearInputValue();
	      this.closeSuggestionList();
	      this.resetSuggestions();
	      this.props.onAddTag(tag);
	    }

	    /**
	    * clear input value
	    */

	  }, {
	    key: 'clearInputValue',
	    value: function clearInputValue() {
	      this.setState({
	        inputValue: ''
	      });
	    }

	    /**
	     * remove tag label
	     * @param {Number} idx // index of element in array
	     */

	  }, {
	    key: 'removeTag',
	    value: function removeTag(idx) {
	      this.props.onRemoveTag(idx);
	    }
	  }, {
	    key: 'focus',
	    value: function focus() {
	      this.input.focus();
	    }

	    // @TODO (@nikolenkoanton92) need fix blur

	  }, {
	    key: 'blur',
	    value: function blur() {
	      this.input.blur();
	      this.wrapper.blur();
	    }
	  }, {
	    key: 'handleClickOnWrapper',
	    value: function handleClickOnWrapper(event) {
	      var tag = event.target.tagName.toLowerCase();

	      if (tag === 'span') {
	        return false;
	      }

	      this.focus();
	      // this.blur()

	      if (this.props.isSuggestList) {
	        this.openSuggestionList();
	      }

	      return undefined;
	    }
	  }, {
	    key: 'openSuggestionList',
	    value: function openSuggestionList() {
	      this.setState({
	        isOpen: true
	      });
	    }
	  }, {
	    key: 'closeSuggestionList',
	    value: function closeSuggestionList() {
	      this.setState({
	        isOpen: false
	      });
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(event) {
	      var addTag = this.props.addTagKeys;
	      var removeTag = this.props.removeTagKeys;
	      var value = this.state.inputValue;
	      var add = addTag.indexOf(event.keyCode) !== -1;
	      var remove = removeTag.indexOf(event.keyCode) !== -1;
	      if (event.keyCode === this.props.keyArrowDown) {
	        this.handleArrowDown();
	      }

	      if (event.keyCode === this.props.keyArrowUp) {
	        this.handleArrowUp();
	      }

	      if (add && value !== '') {
	        event.preventDefault();
	        this.addNewTag(value);
	      }

	      if (remove && value === '') {
	        event.preventDefault();
	        this.removeTag(this.state.tags.length - 1);
	      }

	      if (event.keyCode === 8 && value !== '') {
	        this.resetSuggestions();
	      }
	    }
	  }, {
	    key: 'handleInputChange',
	    value: function handleInputChange(event) {
	      var value = event.target.value.trim();
	      this.setState({
	        inputValue: value
	      });

	      this.openSuggestionList();
	      this.filterSuggestions(value);
	    }
	  }, {
	    key: 'handleMouseMove',
	    value: function handleMouseMove(idx) {
	      this.setState({
	        suggestValueFocus: idx
	      });
	    }
	  }, {
	    key: 'handleArrowDown',
	    value: function handleArrowDown() {
	      var total = this.state.suggestions.length - 1;
	      var idx = this.state.suggestValueFocus;

	      if (idx < total) {
	        this.setState({
	          suggestValueFocus: idx + 1
	        });
	      }
	    }
	  }, {
	    key: 'handleArrowUp',
	    value: function handleArrowUp() {
	      var idx = this.state.suggestValueFocus;
	      if (idx !== 0) {
	        this.setState({
	          suggestValueFocus: idx - 1
	        });
	      }
	    }
	  }, {
	    key: 'handleClickOnSuggestion',
	    value: function handleClickOnSuggestion(value) {
	      if (value !== '') {
	        this.addNewTag(value);
	      }
	    }
	  }, {
	    key: 'handleMouseDownArrow',
	    value: function handleMouseDownArrow(event) {
	      var tag = event.target.tagName.toLowerCase();
	      if (tag !== 'span') {
	        return false;
	      }

	      return this.setState({
	        isOpen: !this.state.isOpen
	      });
	    }
	  }, {
	    key: 'filterSuggestions',
	    value: function filterSuggestions(value) {
	      var suggestions = this.state.suggestions;
	      var self = this;
	      var filteredSuggestions = suggestions.filter(function (el) {
	        return el[self.props.suggestionValueName].toLowerCase().indexOf(value.toLowerCase()) > -1;
	      });

	      this.setState({
	        suggestions: filteredSuggestions
	      });
	    }
	  }, {
	    key: 'resetSuggestions',
	    value: function resetSuggestions() {
	      var suggestions = this.props.suggestions;

	      this.setState({
	        suggestions: suggestions
	      });
	    }
	  }, {
	    key: 'renderSuggestList',
	    value: function renderSuggestList() {
	      var suggestions = this.state.suggestions;
	      if (this.state.isOpen && suggestions.length > 0 && this.props.isSuggestList) {
	        return _react2.default.createElement(_suggestList2.default, {
	          suggestValueFocus: this.state.suggestValueFocus,
	          suggestions: suggestions,
	          valueName: this.props.suggestionValueName,
	          onClick: this.handleClickOnSuggestion,
	          onMouseMove: this.handleMouseMove
	        });
	      }

	      return null;
	    }
	  }, {
	    key: 'renderDropdown',
	    value: function renderDropdown() {
	      var dropdownBoxArrowClass = this.state.isOpen ? 'input-dropdown-box-arrow-up' : 'input-dropdown-box-arrow-down';

	      return _react2.default.createElement(
	        'span',
	        { className: 'input-dropdown-box', onMouseDown: this.handleMouseDownArrow },
	        _react2.default.createElement('span', { className: dropdownBoxArrowClass, onMouseDown: this.handleMouseDownArrow })
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var self = this;
	      var tags = this.props.tags && this.props.tags.map(function (tag, idx) {
	        return _react2.default.createElement(_tag2.default, { key: idx, label: tag, index: idx, onRemove: self.removeTag });
	      });

	      var suggestListWrapper = this.renderSuggestList();
	      var dropdownSpan = this.props.isSuggestList ? this.renderDropdown() : null;

	      return _react2.default.createElement(
	        'div',
	        { className: 'suggest-wrapper' },
	        _react2.default.createElement(
	          'div',
	          {
	            ref: function ref(wrapper) {
	              _this2.wrapper = wrapper;
	            },
	            className: 'input-suggest-wrapper',
	            onClick: this.handleClickOnWrapper
	          },
	          tags,
	          _react2.default.createElement(_input2.default, {
	            ref: function ref(input) {
	              _this2.input = input;
	            },
	            value: this.state.inputValue,
	            onKeyDown: this.handleKeyDown,
	            onChange: this.handleInputChange,
	            readOnly: this.props.readOnly,
	            placeholder: this.props.placeholder
	          }),
	          dropdownSpan
	        ),
	        suggestListWrapper
	      );
	    }
	  }]);

	  return ReactInputSuggest;
	}(_react.Component);

	/**
	 * Setup Property Types
	 */


	ReactInputSuggest.propTypes = {
	  onAddTag: _react2.default.PropTypes.func, // function(tags){}
	  onRemoveTag: _react2.default.PropTypes.func, // function(idx){}
	  keyArrowDown: _react2.default.PropTypes.number, // key arrow up
	  keyArrowUp: _react2.default.PropTypes.number, // key arrow down
	  // addTagKeys: React.PropTypes.array, // array of number key(s) for add a new tag
	  addTagKeys: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
	  // removeTagKeys: React.PropTypes.array, // array of number key(s) for remove tag
	  removeTagKeys: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
	  readOnly: _react2.default.PropTypes.bool, // input with readOnly
	  isSuggestList: _react2.default.PropTypes.bool, // disable suggest list or not
	  suggestions: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
	  // suggestions: React.PropTypes.array, // array of suggestions elements for suggestions list,
	  suggestionValueName: _react2.default.PropTypes.string, // name of suggestions property value
	  placeholder: _react2.default.PropTypes.string,
	  tags: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)
	};

	/**
	 * Set Default Props Value
	 */
	ReactInputSuggest.defaultProps = {
	  addTagKeys: [13, 9, 32],
	  removeTagKeys: [8, 27],
	  keyArrowDown: 40,
	  keyArrowUp: 38,
	  readOnly: false,
	  isSuggestList: false,
	  tags: [],
	  suggestions: [],
	  suggestionValueName: 'name',
	  placeholder: 'Add new tag'
	};

	exports.default = ReactInputSuggest;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Module dependencies
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Tag = function (_Component) {
	  _inherits(Tag, _Component);

	  function Tag(props) {
	    _classCallCheck(this, Tag);

	    var _this = _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).call(this, props));

	    _this.onRemove = _this.onRemove.bind(_this);
	    return _this;
	  }

	  _createClass(Tag, [{
	    key: "onRemove",
	    value: function onRemove(event) {
	      event.preventDefault();
	      this.props.onRemove(this.props.index);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        { className: "input-suggest-value" },
	        _react2.default.createElement(
	          "span",
	          { className: "input-suggest-label" },
	          this.props.label
	        ),
	        _react2.default.createElement(
	          "span",
	          { className: "input-sugges-value-icon", onClick: this.onRemove },
	          "x"
	        )
	      );
	    }
	  }]);

	  return Tag;
	}(_react.Component);

	/**
	 * Setup Property Types
	 */


	Tag.propTypes = {
	  index: _react2.default.PropTypes.number,
	  label: _react2.default.PropTypes.string.isRequired,
	  onRemove: _react2.default.PropTypes.func
	};

	exports.default = Tag;

/***/ }
/******/ ])
});
;