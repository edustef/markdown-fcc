/* eslint-disable no-useless-concat */
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
      isEditor: true,
      isMobile: false,
      scrollPercent: 0
    };
  }

  render() {
    return (
      <div className="outer-container">
        <h1 id="title">Markdown Preview</h1>
        <div className="container">
          {!this.state.isMobile || this.state.isEditor ? (
            <Editor
              isMobile={this.state.isMobile}
              handleChange={this.handleChange}
              handleToggle={this.handleToggle}
              handleScroll={this.handleScroll}
              handleIsEditor={this.handleIsEditor}
              rawContent={this.state.rawContent}
            />
          ) : null}
          {!this.state.isMobile || !this.state.isEditor ? (
            <Preview
              isMobile={this.state.isMobile}
              handleChange={this.handleChange}
              renderedContent={this.state.renderedContent}
              handleToggle={this.handleToggle}
              handleScroll={this.handleScroll}
              handleIsEditor={this.handleIsEditor}
            />
          ) : null}
        </div>
      </div>
    );
  }

  // Adds listener for resizing to determine if it is mobile or not
  componentDidMount() {
    marked.setOptions({
      gfm: true,
      breaks: true
    });
    const dummyData =
      "# This is heading 1" +
      "\n" +
      "## This is heading 2" +
      "\n" +
      "" +
      "\n" +
      "This is *italic* this is **bold** " +
      "\n" +
      "" +
      "\n" +
      "[GitHub](https://www.github.com)" +
      "\n" +
      "" +
      "\n" +
      "`<p>This is inline code</p>`" +
      "\n" +
      "```javascript" +
      "\n" +
      "for(let i = 0; i < 3; i++) {" +
      "\n" +
      'console.log("This is a code block");' +
      "\n" +
      "}" +
      "\n" +
      "```" +
      "\n" +
      "" +
      "\n" +
      "Ordered list " +
      "\n" +
      "" +
      "\n" +
      "1.item 1" +
      "\n" +
      "1. item 2" +
      "\n" +
      "3. item 3" +
      "\n" +
      "0. item 4" +
      "\n" +
      "" +
      "\n" +
      "or unordered" +
      "\n" +
      "" +
      "\n" +
      "- item 1" +
      "\n" +
      "- item 2" +
      "\n" +
      "- item 3" +
      "\n" +
      "" +
      "\n" +
      "> This is a blockquote" +
      "\n" +
      "" +
      "\n" +
      "![Alternative text here](https://via.placeholder.com/150)";
    this.setState({
      rawContent: dummyData
    });
    window.addEventListener("resize", this.updateIsMobileState);
    this.updateIsMobileState();
    this.handleChange(dummyData);
  }

  // Removes the listener at unmounting
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateIsMobileState);
  }

  // Converts the editor's raw text into html
  handleChange = rawContent => {
    this.setState({
      rawContent: rawContent,
      renderedContent: domPurify.sanitize(marked(rawContent))
    });
  };

  handleIsEditor = isEditor => {
    this.setState({
      isEditor: isEditor
    });
  };

  handleToggle = () => {
    this.setState(this.getCurrentScrollPercent);
    this.setState(this.toggleEditor, () =>
      this.setScrollPosition(this.state.isEditor)
    );
  };

  handleScroll = () => {
    this.setState(
      this.getCurrentScrollPercent,
      this.setScrollPosition(!this.state.isEditor)
    );
  };

  toggleEditor = state => {
    return {
      isEditor: !state.isEditor
    };
  };

  getCurrentScrollPercent = state => {
    let panel = document.querySelector(state.isEditor ? "#editor" : "#preview");

    return {
      scrollPercent: panel.scrollTop / (panel.scrollHeight - panel.offsetHeight)
    };
  };

  setScrollPosition = isEditor => {
    let panel = document.querySelector(isEditor ? "#editor" : "#preview");

    panel.scrollTop =
      (panel.scrollHeight - panel.offsetHeight) * this.state.scrollPercent;
  };

  updateIsMobileState = () => {
    this.setState({
      isMobile: window.innerWidth <= 720 ? true : false
    });
  };
}
