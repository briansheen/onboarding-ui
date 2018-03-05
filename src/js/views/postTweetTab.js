import React from 'react';
import PostTweetUI from './postTweet.js';

class PostTweetTab extends React.Component {
  render() {
    return React.createElement('div', {className: 'postTweetTab'},
      React.createElement('h1', {className: 'header'}, 'Post Tweet'),
      React.createElement(PostTweetUI, {isReply: false}));
  }
}

module.exports = PostTweetTab;
