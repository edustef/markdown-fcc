import React, { Component } from "react";

export default class Editor extends Component {
  render() {
    return (
      <div id="editor">
        <div className="group-toggle">
          <h2>Editor</h2>
          <button onClick={this.props.handleToggle} className="btn-toggle">
            Toggle
          </button>
        </div>
        <textarea
          value={this.props.rawContent}
          onChange={this.updateEditor}
          placeholder="Type here..."
        ></textarea>
      </div>
    );
  }

  updateEditor = event => {
    this.props.handleChange(event.target.value);
  };
}
