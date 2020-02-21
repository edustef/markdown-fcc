import React from "react";

export default function Button(props) {
  return (
    <div id="btn-toggle">
      <button id="btn-toggle-pr" onClick={props.handleToggle}>Toggle</button>
    </div>
  );
}
