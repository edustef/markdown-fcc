import React, { Component } from "react";
import marked from "marked";
import domPurify from "dompurify";

import Editor from "./Editor";
import Preview from "./Preview";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawContent: "",
      renderedContent: "",
      editor: true,
      isMobile: false 
    };
  }

  render() {
    return (
      <div className="outer-container">
        <h1 id="title">Markdown Preview</h1>
        <div className="container">
          {this.state.editor || !this.state.isMobile ? (
            <Editor
              handleChange={this.handleChange}
              handleToggle={this.handleToggle}
              rawContent={this.state.rawContent}
            />
          ) : null}
          {!this.state.editor || !this.state.isMobile ? (
            <Preview
              handleChange={this.handleChange}
              renderedContent={this.state.renderedContent}
              handleToggle={this.handleToggle}
            />
          ) : null}
        </div>
      </div>
    );
  }

  // Adds listener for resizing to determine if it is mobile or not 
  componentDidMount() {
    window.addEventListener("resize", this.updateMobileState);
    this.updateMobileState();
  }
  
  // Removes the listener at unmounting
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateMobileState);
  }

  // Converts the editor's raw text into html based on markdown syntax 
  handleChange = rawContent => {
    this.setState({
      rawContent: rawContent,
      renderedContent: domPurify.sanitize(marked(rawContent))
    });
  };

  // This only works if isMobile is true
  handleToggle = () => {
    this.setState({
      editor: !this.state.editor
    });
  };

  // Check if isMobile is true
  updateMobileState = () => {
    this.setState({
      isMobile: window.innerWidth <= 720 ? true : false
    });
  };
}
