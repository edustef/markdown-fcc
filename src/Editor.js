import React, { Component } from 'react'

export default class Editor extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="editor">
        <h2>Editor</h2>
        <textarea value={this.props.content} onChange={this.updateEditor} placeholder="Type here...">
        </textarea>
      </div>
    )
  }

  updateEditor = (event) => {
    this.props.handleChange(event.target.value);
  }
}
