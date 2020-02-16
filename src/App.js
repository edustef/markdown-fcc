import React, { Component } from 'react'

import Editor from './Editor'
import Preview from './Preview'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Editor />
        <Preview />
      </div>
    )
  }
}
