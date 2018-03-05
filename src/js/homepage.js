import React from "react";
import ReactDOM from "react-dom";
import Homepage from './views/homepage.js';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(React.createElement(Homepage), document.getElementById('homepage'));

  document.getElementById('defaultTab').click();
});
