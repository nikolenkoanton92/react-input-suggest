import 'react-input-suggest.css'
import './style.css'

import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactInputSuggest from 'react-input-suggest'

import STATES from './data/states'

class App extends Component {
  render() {
    return (
      <div className="container">
      <h1>Example App</h1>
      <ReactInputSuggest suggestions={STATES}/>
      </div>
      )
  }
}

render((
  <App />
  ), document.getElementById('example'))
