/* eslint-disable no-useless-concat */
import React, { Component } from "react";
import marked from "marked";
import domPurify from "dompurify";

import Editor from "./Editor";
import Preview from "./Preview";
import "./App.css";
// import BarLoader from '@bit/davidhu2000.react-spinners.bar-loader';

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

    window.addEventListener("resize", this.updateIsMobileState);
    this.updateIsMobileState();

    if (!localStorage.getItem("rawContent")) {
      this.populateStorage();
    } else {
      this.setRawContent();
    }
  }

  // Removes the listener at unmounting
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateIsMobileState);
  }

  // Converts the editor's raw text into html
  handleChange = rawContent => {
    this.setState(
      {
        rawContent: rawContent,
        renderedContent: domPurify.sanitize(marked(rawContent))
      },
      this.populateStorage
    );
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

  populateStorage = () => {
    localStorage.setItem("rawContent", this.state.rawContent);
  };

  setRawContent = () => {
    this.handleChange(localStorage.getItem("rawContent"));
  };
}
