import React, { Component } from 'react'


export default class Preview extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div id="preview-body">
        <h2>Preview</h2>
        <div id="preview">
          {this.props.content}
        </div>
      </div>
    )
  }
}
