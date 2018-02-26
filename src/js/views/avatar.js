import React from "react";

class Avatar extends React.Component {
  render() {
    let user = this.props.user;
    return React.createElement('div', {className: 'userInfo'},
      React.createElement('div', {className: 'img'},
        React.createElement('img', {src: `${user.profileImageUrl}`, className: 'img-circle'})),
      React.createElement('div', {className: 'name'}, `${user.name}`),
      this.props.isHomeTimeline ? React.createElement('div', {className: 'handle'}, `@${user.twitterHandle}`) : null);
  }
}

module.exports = Avatar;
