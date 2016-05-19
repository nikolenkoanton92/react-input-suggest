import 'react-input-suggest.css'
import './style.css'

import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactInputSuggest from 'react-input-suggest'

class App extends Component {
  render() {
    return (
      <div className="container">
      <h1>Example App</h1>
      <ReactInputSuggest />
      </div>
      )
  }
}

render((
  <App />
  ), document.getElementById('example'))
