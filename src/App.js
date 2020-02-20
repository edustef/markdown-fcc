import React, { Component } from 'react'

import Editor from './Editor'
import Preview from './Preview'
import './App.css'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ""
    }
  }

  handleChange = (content) => {
    this.setState({
      content: content
    });
  }

  render() {
    return (
      <div className="container">
        <Editor handleChange={this.handleChange}/>
        <Preview handleChange={this.handleChange} content = {this.state.content}/>
      </div>
    );
  }
}
