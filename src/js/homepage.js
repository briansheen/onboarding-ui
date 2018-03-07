import React from "react";
import ReactDOM from "react-dom";
import HomepageContent from './views/homepageContent.js';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(React.createElement(HomepageContent), document.getElementById('homepage'));

  document.getElementById('defaultTab').click();
});
