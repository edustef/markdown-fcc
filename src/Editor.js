import React, { Component } from "react";

import Button from "./components/ToggleButton";

export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      needsHelp: true
    };
  }

  componentDidMount() {
    if (localStorage.getItem("needsHelp")) {
      this.handleSvgHelper();
    } else {
      localStorage.setItem("needsHelp", this.state.needsHelp);
    }
  }

  render() {
    return (
      <div id="editor-container">
        <div className="group-toggle">
          <h2>Editor</h2>
          <div>
            <button
              className="dl-btn"
              onClick={() =>
                this.props.saveFile(this.props.rawContent, "rawContent.md")
              }
            >
              <img
                className="svg-icon"
                src={process.env.PUBLIC_URL + "/icons/download-solid.svg"}
                alt="Download "
              />{" "}
              Markdown
            </button>
          </div>
          <img
            className={
              this.state.needsHelp ? "svg-helper bounce" : "svg-helper"
            }
            src={process.env.PUBLIC_URL + "/icons/question-circle.svg"}
            alt="Help"
            onClick={this.handleSvgHelper}
          />
          <Button handleToggle={this.props.handleToggle} />
        </div>
        <div id="modal-container" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <p>Some text in the Modal..</p>
          </div>
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

  handleSvgHelper = () => {
    this.setState(
      () => ({ needsHelp: false }),
      () => localStorage.setItem("needsHelp", this.state.needsHelp)
    );

  };
}
