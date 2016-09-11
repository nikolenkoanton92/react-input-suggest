'use strict';

/**
 * Module dependencies
 */

var React = require('react');
var Tag = require('./tag');
var Input = require('./input');
var SuggestList = require('./suggest-list');

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
    suggestions: React.PropTypes.array, // array of suggestions elements for suggestions list,
    suggestionValueName: React.PropTypes.string, // name of suggestions property value
    placeholder: React.PropTypes.string
  },

  /**
   * Set Default Props Value
   */

  getDefaultProps: function getDefaultProps() {
    return {
      addTagKeys: [13, 9, 32],
      removeTagKeys: [8, 27],
      readOnly: false,
      isSuggestList: true,
      tags: [],
      suggestions: [],
      suggestionValueName: 'name',
      placeholder: 'Add new tag'
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

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.suggestions !== this.state.suggestions) {

      this.setState({
        suggestions: nextProps.suggestions.concat([])
      });
    }
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

  handleClickOnSuggestion: function handleClickOnSuggestion(value) {
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
        valueName: this.props.suggestionValueName,
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
    var self = this;
    var filteredSuggestions = suggestions.filter(function (el) {
      if (el[self.props.suggestionValueName].indexOf(value) > -1) {
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