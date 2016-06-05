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

	/**
	 * Module dependencies
	 */

	var React = __webpack_require__(1);
	var Tag = __webpack_require__(4);
	var Input = __webpack_require__(2);
	var SuggestList = __webpack_require__(3);

	/**
	 * expose React Input Suggest component
	 */

	module.exports = React.createClass({
	  displayName: 'exports',


	  /**
	   * Setup Property Types
	   */

	  propTypes: {
	    onAddTag: React.PropTypes.func, // function(tags){}
	    onRemoveTag: React.PropTypes.func, // function(idx){}
	    addTagKeys: React.PropTypes.array, // array of number key(s) for add a new tag
	    removeTagKeys: React.PropTypes.array, // array of number key(s) for remove tag
	    readOnly: React.PropTypes.bool, // input with readOnly
	    isSuggestList: React.PropTypes.bool, // disable suggest list or not
	    suggestions: React.PropTypes.array // array of suggestions elements for suggestions list
	  },

	  /**
	   * Set Default Props Value
	   */

	  getDefaultProps: function getDefaultProps() {
	    return {
	      addTagKeys: [13, 9, 13, 40],
	      removeTagKeys: [8, 27],
	      readOnly: false,
	      isSuggestList: true,
	      tags: [],
	      suggestions: []
	    };
	  },

	  /**
	   * Set Default State Value
	   */

	  getInitialState: function getInitialState() {
	    return {
	      inputValue: '',
	      tags: [],
	      isOpen: false,
	      suggestions: this.props.suggestions,
	      suggestValueFocus: 0
	    };
	  },

	  /**
	   * add new tag
	   * @param {String} tag
	   */

	  addNewTag: function addNewTag(tag) {
	    this.clearInputValue();
	    this.closeSuggestionList();
	    this.resetSuggestions();
	    this.props.onAddTag(tag);
	  },

	  /**
	   * clear input value
	   */

	  clearInputValue: function clearInputValue() {
	    this.setState({
	      inputValue: ''
	    });
	  },

	  /**
	   * remove tag label
	   * @param {Number} idx // index of element in array
	   */

	  removeTag: function removeTag(idx) {
	    this.props.onRemoveTag(idx);
	  },

	  focus: function focus() {
	    this.refs.input.focus();
	  },

	  // @TODO (@nikolenkoanton92) need fix blur
	  blur: function blur() {
	    this.refs.input.blur();
	    this.refs.wrapper.blur();
	  },

	  handleClickOnWrapper: function handleClickOnWrapper(event) {
	    var tag = event.target.tagName.toLowerCase();

	    if (tag === 'span') {
	      return false;
	    }

	    this.focus();
	    // this.blur()

	    if (this.props.isSuggestList) this.openSuggestionList();
	  },

	  openSuggestionList: function openSuggestionList() {
	    this.setState({
	      isOpen: true
	    });
	  },

	  closeSuggestionList: function closeSuggestionList() {
	    this.setState({
	      isOpen: false
	    });
	  },

	  handleKeyDown: function handleKeyDown(event) {
	    var addTag = this.props.addTagKeys;
	    var removeTag = this.props.removeTagKeys;
	    var value = this.state.inputValue;
	    var add = addTag.indexOf(event.keyCode) !== -1;
	    var remove = removeTag.indexOf(event.keyCode) !== -1;

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
	  },

	  handleInputChange: function handleInputChange(event) {
	    var value = event.target.value.trim();
	    this.setState({
	      inputValue: value
	    });

	    this.openSuggestionList();
	    this.filterSuggestions(value);
	  },

	  handleMouseMove: function handleMouseMove(idx) {
	    this.setState({
	      suggestValueFocus: idx
	    });
	  },

	  handleClickOnSuggestion: function handleClickOnSuggestion(idx) {
	    var value = this.props.suggestions[idx].name;

	    if (value !== '') {
	      this.addNewTag(value);
	    }
	  },

	  renderSuggestList: function renderSuggestList() {

	    var suggestions = this.state.suggestions;
	    if (this.state.isOpen && suggestions.length > 0 && this.props.isSuggestList) {
	      return React.createElement(SuggestList, {
	        suggestValueFocus: this.state.suggestValueFocus,
	        suggestions: suggestions,
	        onClick: this.handleClickOnSuggestion,
	        onMouseMove: this.handleMouseMove
	      });
	    } else {
	      return null;
	    }
	  },

	  renderDropdown: function renderDropdown() {
	    var dropdownBoxArrowClass = this.state.isOpen ? 'input-dropdown-box-arrow-up' : 'input-dropdown-box-arrow-down';

	    return React.createElement(
	      'span',
	      { className: 'input-dropdown-box', onMouseDown: this.handleMouseDownArrow },
	      React.createElement('span', { className: dropdownBoxArrowClass, onMouseDown: this.handleMouseDownArrow })
	    );
	  },

	  handleMouseDownArrow: function handleMouseDownArrow(event) {
	    var tag = event.target.tagName.toLowerCase();
	    if (tag !== 'span') {
	      return false;
	    }

	    this.setState({
	      isOpen: !this.state.isOpen
	    });
	  },

	  filterSuggestions: function filterSuggestions(value) {

	    var suggestions = this.state.suggestions;

	    var filteredSuggestions = suggestions.filter(function (el) {
	      if (el.name.indexOf(value) > -1) {
	        return el;
	      }
	    });

	    this.setState({
	      suggestions: filteredSuggestions
	    });
	  },

	  resetSuggestions: function resetSuggestions() {
	    var suggestions = this.props.suggestions;

	    this.setState({
	      suggestions: suggestions
	    });
	  },

	  render: function render() {
	    var self = this;
	    var tags = this.props.tags && this.props.tags.map(function (tag, idx) {
	      return React.createElement(Tag, { key: idx, label: tag, index: idx, onRemove: self.removeTag });
	    });

	    var suggestListWrapper = this.renderSuggestList();
	    var dropdownSpan = this.props.isSuggestList ? this.renderDropdown() : null;

	    return React.createElement(
	      'div',
	      { className: 'suggest-wrapper' },
	      React.createElement(
	        'div',
	        { ref: 'wrapper', className: 'input-suggest-wrapper', onClick: this.handleClickOnWrapper },
	        tags,
	        React.createElement(Input, { ref: 'input',
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
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Module dependencies
	 */

	var React = __webpack_require__(1);

	module.exports = React.createClass({
	  displayName: 'exports',


	  /**
	   * Setup Property Types
	   */

	  propTypes: {
	    onChange: React.PropTypes.func,
	    onKeyDown: React.PropTypes.func,
	    placeholder: React.PropTypes.string
	  },
	  getDefaultProps: function getDefaultProps() {
	    placeholder: '';
	  },

	  getInitialState: function getInitialState() {
	    return {
	      value: '',
	      width: '5px'
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this.changeInputWidth();
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.value !== this.state.value) {
	      var value = nextProps.value.trim();

	      this.setState({
	        value: value
	      });
	      this.changeInputWidth();
	    }
	  },

	  changeInputWidth: function changeInputWidth() {
	    var placeholder = this.props.placeholder;
	    var value = this.state.value;
	    var width = '5px';

	    if (placeholder !== '' || value === '') {
	      width = placeholder.length * 8 + 'px';
	    } else if (placeholder !== '' || value !== '') {
	      width = 'auto';
	    }

	    if (width !== this.state.width) {
	      this.setState({
	        width: width
	      });
	    }
	  },

	  focus: function focus() {
	    this.refs.input.focus();
	  },

	  render: function render() {
	    var style = {
	      width: this.state.width
	    };
	    return React.createElement('input', { ref: 'input', className: 'input-suggest-input',
	      style: style,
	      placeholder: this.props.placeholder,
	      value: this.state.value,
	      onChange: this.props.onChange,
	      onKeyDown: this.props.onKeyDown,
	      readOnly: this.props.readOnly,
	      size: this.state.size
	    });
	  }
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Module dependencies
	 */

	var React = __webpack_require__(1);

	var ListValue = React.createClass({
	  displayName: 'ListValue',


	  propTypes: {
	    name: React.PropTypes.string.isRequired,
	    onClick: React.PropTypes.func,
	    onMouseMove: React.PropTypes.func,
	    isFocused: React.PropTypes.bool
	  },
	  render: function render() {
	    var className = this.props.isFocused ? 'suggest-list-value is-focused' : 'suggest-list-value';
	    return React.createElement(
	      'div',
	      { className: className,
	        onClick: this.props.onClick,
	        onMouseMove: this.props.onMouseMove,
	        onKeyDown: this.props.onKeyDown },
	      this.props.name
	    );
	  }
	});

	module.exports = React.createClass({
	  displayName: 'exports',


	  /**
	   * Setup Property Types
	   */

	  propTypes: {
	    suggestions: React.PropTypes.array,
	    suggestValueFocus: React.PropTypes.number
	  },

	  getInitialState: function getInitialState() {
	    return {
	      isFocused: this.props.isFocused,
	      suggestValueFocus: this.props.suggestValueFocus
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.suggestValueFocus !== this.state.suggestValueFocus) {
	      this.setState({
	        suggestValueFocus: nextProps.suggestValueFocus
	      });
	    }
	  },

	  render: function render() {
	    var self = this;
	    var list = this.props.suggestions && this.props.suggestions.map(function (el, idx) {

	      var isFocused = self.state.suggestValueFocus === idx ? true : false;

	      return React.createElement(ListValue, {
	        key: idx,
	        name: el.name,
	        onClick: self.props.onClick.bind(null, idx),
	        onMouseMove: self.props.onMouseMove.bind(null, idx),
	        isFocused: isFocused
	      });
	    });

	    return React.createElement(
	      'div',
	      { className: 'suggest-list-wrapper' },
	      React.createElement(
	        'div',
	        { className: 'suggest-list' },
	        list
	      )
	    );
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Module dependencies
	 */

	var React = __webpack_require__(1);

	module.exports = React.createClass({
	  displayName: "exports",


	  /**
	   * Setup Property Types
	   */

	  propTypes: {
	    index: React.PropTypes.number,
	    label: React.PropTypes.string.isRequired,
	    onClick: React.PropTypes.func,
	    onRemove: React.PropTypes.func
	  },

	  onRemove: function onRemove(event) {
	    event.preventDefault();
	    this.props.onRemove(this.props.index);
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "input-suggest-value" },
	      React.createElement(
	        "span",
	        { className: "input-suggest-label" },
	        this.props.label
	      ),
	      React.createElement(
	        "span",
	        { className: "input-sugges-value-icon", onClick: this.onRemove },
	        "x"
	      )
	    );
	  }
	});

/***/ }
/******/ ])
});
;