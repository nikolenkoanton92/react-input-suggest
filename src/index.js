/**
 * Module dependencies
 */

var React = require('react')
var Tag = require('./tag')
var Input = require('./input')
var SuggestList = require('./suggest-list')

/**
 * expose React Input Suggest component
 */

module.exports = React.createClass({

  /**
   * Setup Property Types
   */

  propTypes: {
    onChange: React.PropTypes.func, // function(tags){}
    addTagKeys: React.PropTypes.array, // array of number key(s) for add a new tag
    removeTagKeys: React.PropTypes.array, // array of number key(s) for remove tag
    readOnly: React.PropTypes.bool, // input with readOnly
    isSuggestList: React.PropTypes.bool, // disable suggest list or not
    suggestions: React.PropTypes.array // array of suggestions elements for suggestions list
  },

  /**
   * Set Default Props Value
   */

  getDefaultProps: function() {
    return {
      addTagKeys: [13, 9, 13, 40],
      removeTagKeys: [8, 27],
      readOnly: false,
      isSuggestList: true,
      suggestions: []
    }
  },

  /**
   * Set Default State Value
   */

  getInitialState: function() {
    return {
      inputValue: '',
      tags: [],
      isOpen: false,
      suggestions: this.props.suggestions,
      suggestValueFocus: 0
    }
  },

  /**
   * add new tag
   * @param {String} tag
   */

  addNewTag: function(tag) {
    var tags = this.state.tags.slice()
    tags.push(tag)
    this.setState({
      tags: tags
    })

    this.clearInputValue()
    this.closeSuggestionList()
    this.resetSuggestions()

  },

  /**
   * clear input value
   */

  clearInputValue: function() {
    this.setState({
      inputValue: ''
    })
  },

  /**
   * remove tag label
   * @param {Number} idx // index of element in array
   */

  removeTag: function(idx) {
    var tags = this.state.tags
    tags.splice(idx, 1)

    this.setState({
      tags: tags
    })
  },

  focus: function() {
    this.refs.input.focus()
  },


  // @TODO (@nikolenkoanton92) need fix blur
  blur: function() {
    this.refs.input.blur()
    this.refs.wrapper.blur()
  },

  handleClickOnWrapper: function(event) {
    var tag = event.target.tagName.toLowerCase()

    if (tag === 'span') {
      return false
    }

    this.focus()
    // this.blur()

    if (this.props.isSuggestList)
      this.openSuggestionList()
  },

  openSuggestionList: function() {
    this.setState({
      isOpen: true
    })
  },

  closeSuggestionList: function() {
    this.setState({
      isOpen: false
    })
  },

  handleKeyDown: function(event) {
    var addTag = this.props.addTagKeys
    var removeTag = this.props.removeTagKeys
    var value = this.state.inputValue
    var add = addTag.indexOf(event.keyCode) !== -1
    var remove = removeTag.indexOf(event.keyCode) !== -1

    if (add && value !== '') {
      event.preventDefault()
      this.addNewTag(value)
    }

    if (remove && value === '') {
      event.preventDefault()
      this.removeTag(this.state.tags.length - 1)
    }

    if (event.keyCode === 8 && value !== '') {
      this.resetSuggestions()
    }
  },

  handleInputChange: function(event) {
    var value = event.target.value.trim()
    this.setState({
      inputValue: value
    })

    this.openSuggestionList()
    this.filterSuggestions(value)
  },

  handleMouseMove: function(idx) {
    this.setState({
      suggestValueFocus: idx
    })
  },

  handleClickOnSuggestion: function(idx) {
    var value = this.props.suggestions[idx].name

    if (value !== '') {
      this.addNewTag(value)
    }
  },

  renderSuggestList: function() {

    var suggestions = this.state.suggestions
    if (this.state.isOpen && suggestions.length > 0 && this.props.isSuggestList) {
      return (
        <SuggestList
        suggestValueFocus={this.state.suggestValueFocus}
        suggestions={suggestions}
        onClick={this.handleClickOnSuggestion}
        onMouseMove={this.handleMouseMove}
        />
        )
    } else {
      return null
    }
  },

  renderDropdown: function() {
    var dropdownBoxArrowClass = this.state.isOpen ?
      'input-dropdown-box-arrow-up' : 'input-dropdown-box-arrow-down'

    return (
      <span className="input-dropdown-box" onMouseDown={this.handleMouseDownArrow}>
      <span className={dropdownBoxArrowClass} onMouseDown={this.handleMouseDownArrow}></span>
      </span>
      )
  },

  handleMouseDownArrow: function(event) {
    var tag = event.target.tagName.toLowerCase()
    if (tag !== 'span') {
      return false
    }

    this.setState({
      isOpen: !this.state.isOpen
    })
  },

  filterSuggestions: function(value) {

    var suggestions = this.state.suggestions

    var filteredSuggestions = suggestions.filter(function(el) {
      if (el.name.indexOf(value) > -1) {
        return el
      }
    })

    this.setState({
      suggestions: filteredSuggestions
    })
  },

  resetSuggestions: function() {
    var suggestions = this.props.suggestions

    this.setState({
      suggestions: suggestions
    })
  },

  render: function() {
    var self = this
    var tags = this.state.tags.map(function(tag, idx) {
      return (
        <Tag key={idx} label={tag} index={idx} onRemove={self.removeTag}/>
        )
    })

    var suggestListWrapper = this.renderSuggestList()
    var dropdownSpan = this.props.isSuggestList ? this.renderDropdown() : null

    return (
      <div className="suggest-wrapper">
      <div ref="wrapper" className="input-suggest-wrapper" onClick={this.handleClickOnWrapper}>
      {tags}
      <Input ref="input"
      value={this.state.inputValue}
      onKeyDown={this.handleKeyDown}
      onChange={this.handleInputChange}
      readOnly={this.props.readOnly}
      />
      {dropdownSpan}
      </div>
      {suggestListWrapper}
      </div>
      )
  }
})
