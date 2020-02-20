import React, { Component } from "react";

export default class Preview extends Component {
  render() {
    return (
      <div id="preview-body">
        <div className="group-toggle">
          <h2>Preview</h2>
          <button onClick={this.props.handleToggle} className="btn-toggle">Toggle</button>
        </div>
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: this.props.renderedContent }}
        ></div>
      </div>
    );
  }
}
