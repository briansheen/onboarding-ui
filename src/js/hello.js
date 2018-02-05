import React from "react";
import ReactDOM from "react-dom";

class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.what}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {what: 'React'}, null),
  document.getElementById("hello")
);
