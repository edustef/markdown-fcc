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
      isEditorScroll: true,
      scrollPercent: 0,
      editorScrollPosition: 0,
      previewScrollPosition: 0,
      isMobile: false
    };
  }

  render() {
    return (
      <div className="outer-container">
        <h1 id="title">Markdown Preview</h1>
        <div className="container">
          {this.state.isEditor || !this.state.isMobile ? (
            <Editor
              handleChange={this.handleChange}
              handleToggle={this.handleToggle}
              handleScroll={this.handleScroll}
              handleIsEditorScroll={this.handleIsEditorScroll}
              rawContent={this.state.rawContent}
            />
          ) : null}
          {!this.state.isEditor || !this.state.isMobile ? (
            <Preview
              handleChange={this.handleChange}
              renderedContent={this.state.renderedContent}
              handleToggle={this.handleToggle}
              handleScroll={this.handleScroll}
              handleIsEditorScroll={this.handleIsEditorScroll}
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
    window.addEventListener("resize", this.updateMobileState);
    this.updateMobileState();
    this.handleChange(dummyData);
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
    this.setState(state => {
      return {
        isEditor: !state.isEditor
      };
    });
  };

  getScrollPercent = (panel) => {
    this.setState(() => ({
      scrollPercent : panel.scrollTop / (panel.scrollHeight - panel.offsetHeight);
    }));
  }

  setScrollPosition() {
    let editorPanel = document.querySelector("#editor");
    let previewPanel = document.querySelector("#preview");
    this.setState(state => ({
      editorScrollPosition: (editorScroll.scrollHeight - editorPanel.offsetHeight) * state.percent;
      previewScrollPosition: (previewPanel.scrollHeight - previewPanel.offsetHeight) * state.percent;
    }));
  }

  // Check if isMobile is true
  updateMobileState = () => {
    this.setState({
      isMobile: window.innerWidth <= 720 ? true : false
    });
  };

  handleScroll = () => {
    if (
      window
        .getComputedStyle(document.querySelector("#btn-toggle"))
        .getPropertyValue("display") === "none"
    ) {
      let elem1 = document.querySelector("#editor");
      let elem2 = document.querySelector("#preview");
      if (!this.state.isEditorScroll) {
        elem1 = document.querySelector("#preview");
        elem2 = document.querySelector("#editor");
      }

      let percent = elem1.scrollTop / (elem1.scrollHeight - elem1.offsetHeight);
      elem2.scrollTop = (elem2.scrollHeight - elem2.offsetHeight) * percent;
    }
  };

  handleIsEditorScroll = isEditorScroll => {
    this.setState(() => ({
      isEditorScroll: isEditorScroll
    }));
  };
}
