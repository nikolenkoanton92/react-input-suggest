import 'react-input-suggest.css'
import './style.css'

import React from 'react'
import { render } from 'react-dom'
import ReactInputSuggest from 'react-input-suggest'

import STATES from './data/states'

const App = React.createClass({
  getInitialState() {
    return {
      tags: []
    }
  },

  handleAddTag(tag) {
    var tags = this.state.tags.slice()
    tags.push(tag)
    this.setState({
      tags: tags
    })
  },

  handleRemoveTag(idx) {
    var tags = this.state.tags
    tags.splice(idx, 1)

    this.setState({
      tags: tags
    })
  },

  render() {
    return (
      <div className="container">
      <h1>Example App</h1>
      <ReactInputSuggest
      tags={this.state.tags}
      onAddTag={this.handleAddTag}
      onRemoveTag={this.handleRemoveTag}
      suggestions={STATES}
      placeholder={'Add new tag'}
      />
      </div>
      )
  }
})

render((
  <App />
  ), document.getElementById('example'))
