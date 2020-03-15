import React, { Component } from "react";

import Button from "./components/ToggleButton";

export default class Editor extends Component {
  render() {
    return (
      <div id="editor-container">
        <div className="group-toggle">
          <h2>Editor</h2>
          <div>
            <button className="dl-btn" onClick={() => this.props.saveFile(this.props.rawContent, "rawContent.md")}>
              <img
                src={process.env.PUBLIC_URL + "/icons/download-solid.svg"}
                alt="Download "
              />{" "}
              markdown
            </button>
          </div>
          <Button handleToggle={this.props.handleToggle} />
        </div>
        <textarea
          id="editor"
          value={this.props.rawContent}
          onChange={event => {
            this.props.handleChange(event.target.value);
          }}
          placeholder="Write here anything you want..."
          onMouseOver={
            !this.props.isMobile ? () => this.props.handleIsEditor(true) : null
          }
          onScroll={!this.props.isMobile ? this.props.handleScroll : null}
        ></textarea>
      </div>
    );
  }
}
