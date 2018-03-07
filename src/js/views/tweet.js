import React from "react";
import Avatar from './avatar.js';
import PubSubListener from './pubSubListener.js';
import {PUBSUBEVENTS} from './pubSubEvents.js';

class Tweet extends React.Component {
  render() {
    let tweet = this.props.tweet;
    let user = tweet.twitterUser;
    let options = this.props.options;
    let date = new Date(tweet.createdAt);
    let formattedDate = date.toLocaleDateString('en-US', {month:'short', day:'2-digit'});
    return React.createElement('div', {className: 'tweet'},
      React.createElement(Avatar, {user: user, showUserHandle: options.showUserHandle}),
      React.createElement('div', {className: 'content'},
        React.createElement('div', {className: 'date'}, formattedDate),
        React.createElement('a', {className: 'link', target: '_blank', href: `https://twitter.com/${user.twitterHandle}/status/${tweet.id}`},
          React.createElement('div', {className: 'msg'}, `${tweet.message}`)),
        options.showReplyButton ? React.createElement('button', {className: 'replyButton', onClick: () => {PubSubListener.publish(PUBSUBEVENTS.REPLY, tweet)}}, React.createElement('i', {className: 'fas fa-reply fa-sm'})) : null
      )
    );
  }
}

module.exports = Tweet;
