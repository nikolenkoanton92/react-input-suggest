/**
 * Module dependencies
 */

const React = require('react');
const Tag = require('./tag');
const Input = require('./input');
const SuggestList = require('./suggest-list');

/**
 * expose React Input Suggest component
 */

module.exports = React.createClass({

  /**
   * Setup Property Types
   */

  propTypes: {
    onAddTag: React.PropTypes.func, // function(tags){}
    onRemoveTag: React.PropTypes.func, // function(idx){}
    keyArrowDown: React.PropTypes.number, // key arrow up
    keyArrowUp: React.PropTypes.number, // key arrow down
    // addTagKeys: React.PropTypes.array, // array of number key(s) for add a new tag
    addTagKeys: React.PropTypes.arrayOf(React.PropTypes.number),
    // removeTagKeys: React.PropTypes.array, // array of number key(s) for remove tag
    removeTagKeys: React.PropTypes.arrayOf(React.PropTypes.number),
    readOnly: React.PropTypes.bool, // input with readOnly
    isSuggestList: React.PropTypes.bool, // disable suggest list or not
    suggestions: React.PropTypes.arrayOf(React.PropTypes.object),
    // suggestions: React.PropTypes.array, // array of suggestions elements for suggestions list,
    suggestionValueName: React.PropTypes.string, // name of suggestions property value
    placeholder: React.PropTypes.string,
    tags: React.PropTypes.arrayOf(React.PropTypes.string),
  },

  /**
   * Set Default Props Value
   */

  getDefaultProps() {
    return {
      addTagKeys: [13, 9, 32],
      removeTagKeys: [8, 27],
      keyArrowDown: 40,
      keyArrowUp: 38,
      readOnly: false,
      isSuggestList: true,
      tags: [],
      suggestions: [],
      suggestionValueName: 'name',
      placeholder: 'Add new tag',
    };
  },

  /**
   * Set Default State Value
   */

  getInitialState() {
    return {
      inputValue: '',
      tags: [],
      isOpen: false,
      suggestions: this.props.suggestions,
      suggestValueFocus: 0,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.suggestions !== this.state.suggestions) {
      this.setState({
        suggestions: nextProps.suggestions.concat([]),
      });
    }
  },

  /**
   * add new tag
   * @param {String} tag
   */

  addNewTag(tag) {
    this.clearInputValue();
    this.closeSuggestionList();
    this.resetSuggestions();
    this.props.onAddTag(tag);
  },

  /**
   * clear input value
   */

  clearInputValue() {
    this.setState({
      inputValue: '',
    });
  },

  /**
   * remove tag label
   * @param {Number} idx // index of element in array
   */

  removeTag(idx) {
    this.props.onRemoveTag(idx);
  },

  focus() {
    this.refs.input.focus();
  },


  // @TODO (@nikolenkoanton92) need fix blur
  blur() {
    this.refs.input.blur();
    this.refs.wrapper.blur();
  },

  handleClickOnWrapper(event) {
    const tag = event.target.tagName.toLowerCase();

    if (tag === 'span') {
      return false;
    }

    this.focus();
    // this.blur()

    if (this.props.isSuggestList) {
      this.openSuggestionList();
    }
  },

  openSuggestionList() {
    this.setState({
      isOpen: true,
    });
  },

  closeSuggestionList() {
    this.setState({
      isOpen: false,
    });
  },

  handleKeyDown(event) {
    const addTag = this.props.addTagKeys;
    const removeTag = this.props.removeTagKeys;
    const value = this.state.inputValue;
    const add = addTag.indexOf(event.keyCode) !== -1;
    const remove = removeTag.indexOf(event.keyCode) !== -1;
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
  },

  handleInputChange(event) {
    const value = event.target.value.trim();
    this.setState({
      inputValue: value,
    });

    this.openSuggestionList();
    this.filterSuggestions(value);
  },

  handleMouseMove(idx) {
    this.setState({
      suggestValueFocus: idx,
    });
  },

  handleArrowDown() {
    const total = this.state.suggestions.length - 1;
    const idx = this.state.suggestValueFocus;

    if (idx < total) {
      this.setState({
        suggestValueFocus: idx + 1,
      });
    }
  },

  handleArrowUp() {
    const idx = this.state.suggestValueFocus;
    if (idx !== 0) {
      this.setState({
        suggestValueFocus: idx - 1,
      });
    }
  },

  handleClickOnSuggestion(value) {
    if (value !== '') {
      this.addNewTag(value);
    }
  },

  renderDropdown() {
    const dropdownBoxArrowClass = this.state.isOpen ?
      'input-dropdown-box-arrow-up' : 'input-dropdown-box-arrow-down';

    return (
      <span className="input-dropdown-box" onMouseDown={this.handleMouseDownArrow}>
        <span className={dropdownBoxArrowClass} onMouseDown={this.handleMouseDownArrow} />
      </span>
    );
  },

  handleMouseDownArrow(event) {
    const tag = event.target.tagName.toLowerCase();
    if (tag !== 'span') {
      return false;
    }

    this.setState({
      isOpen: !this.state.isOpen,
    });
  },

  filterSuggestions(value) {
    const suggestions = this.state.suggestions;
    const self = this;
    const filteredSuggestions = suggestions
      .filter(el => el[self.props.suggestionValueName]
        .toLowerCase().indexOf(value.toLowerCase()) > -1);

    this.setState({
      suggestions: filteredSuggestions,
    });
  },

  resetSuggestions() {
    const suggestions = this.props.suggestions;

    this.setState({
      suggestions,
    });
  },

  renderSuggestList() {
    const suggestions = this.state.suggestions;
    if (this.state.isOpen && suggestions.length > 0 && this.props.isSuggestList) {
      return (
        <SuggestList
          suggestValueFocus={this.state.suggestValueFocus}
          suggestions={suggestions}
          valueName={this.props.suggestionValueName}
          onClick={this.handleClickOnSuggestion}
          onMouseMove={this.handleMouseMove}
        />
      );
    }

    return null;
  },

  render() {
    const self = this;
    const tags = this.props.tags && this.props.tags.map((tag, idx) => (
      <Tag key={idx} label={tag} index={idx} onRemove={self.removeTag} />
        ));

    const suggestListWrapper = this.renderSuggestList();
    const dropdownSpan = this.props.isSuggestList ? this.renderDropdown() : null;

    return (
      <div className="suggest-wrapper">
        <div
          ref="wrapper"
          className="input-suggest-wrapper"
          onClick={this.handleClickOnWrapper}
        >
          {tags}
          <Input
            ref="input"
            value={this.state.inputValue}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleInputChange}
            readOnly={this.props.readOnly}
            placeholder={this.props.placeholder}
          />
          {dropdownSpan}
        </div>
        {suggestListWrapper}
      </div>
    );
  },
});
