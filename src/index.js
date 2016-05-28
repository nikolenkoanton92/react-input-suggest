/**
 * Module dependencies
 */

var React = require('react')
var Tag = require('./tag')
var Input = require('./input')

/**
 * expose React Input Suggest component
 */

module.exports = React.createClass({

  /**
   * Setup Property Types
   */

  propTypes: {
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    addTagKeys: React.PropTypes.array,
    removeTagKeys: React.PropTypes.array,
    readOnly: React.PropTypes.bool
  },

  /**
   * Set Default Props Value
   */

  getDefaultProps: function() {
    return {
      tags: [1],
      placeholder: 'Add new tag',
      addTagKeys: [13, 9, 13, 40],
      removeTagKeys: [8, 27],
      readOnly: false,
      value: ''
    }
  },

  /**
   * Set Default State Value
   */

  getInitialState: function() {
    return {
      inputValue: '',
      tags: []
    }
  },

  addNewTag: function(tag) {
    var tags = this.state.tags.slice()
    tags.push(tag)
    this.setState({
      tags: tags
    })
    this.clearInputValue()
  },

  clearInputValue: function() {
    this.setState({
      inputValue: ''
    })
  },

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
  blur: function() {
    this.refs.input.blur()
    this.refs.wrapper.blur()
  },

  handleClickOnWrapper: function() {
    // this.blur()
    // this.focus()
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

  },

  handleInputChange: function(event) {
    var value = event.target.value.trim()
    this.setState({
      inputValue: value
    })
  },
  render: function() {
    var self = this
    var tags = this.state.tags.map(function(tag, idx) {
      return (
        <Tag key={idx} label={tag} index={idx} onRemove={self.removeTag}/>
        )
    })

    return (
      <div ref="wrapper" className="input-suggest-wrapper" onClick={this.handleClickOnWrapper} onKeyDown={this.handleKeyDown}>
      {tags}
      <Input
      placeholder={this.props.placeholder}
      value={this.state.inputValue}
      onKeyDown={this.handleKeyDown}
      onChange={this.handleInputChange}
      readOnly={this.props.readOnly}
      />
      <div>
      </div>
      </div>
      )
  }
})
