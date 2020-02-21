import React, { Component } from "react";

import Button from "./components/Button";

export default class Editor extends Component {
  render() {
    return (
      <div id="editor-container">
        <div className="group-toggle">
          <h2>Editor</h2>
          <Button handleToggle={this.props.handleToggle} />
        </div>
        <textarea
          id="editor"
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
