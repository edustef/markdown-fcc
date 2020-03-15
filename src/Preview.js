import React, { Component } from "react";

import Button from "./components/Button";

export default class Preview extends Component {
  render() {
    return (
      <div id="preview-container">
        <div className="group-toggle">
          <h2>Preview</h2>
          <Button handleToggle={this.props.handleToggle} />
        </div>
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: this.props.renderedContent }}
          onMouseOver={
            !this.props.isMobile ? () => this.props.handleIsEditor(false) : null
          }
          onScroll={!this.props.isMobile ? this.props.handleScroll : null}
        ></div>
      </div>
    );
  }
}
