import React from "react";
import Tweet from './tweet.js';
import ReplyListener from './replyListener.js';
import PostTweetUI from './postTweet.js';

class ReplyTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      tweet: null,
    }
    this.openReplyTweetModal = this.openReplyTweetModal.bind(this);
    ReplyListener.subscribe('reply', this.openReplyTweetModal);
  }

  openReplyTweetModal(tweet) {
    this.setState({
      display: 'block',
      tweet: tweet,
    })
  }

  closeReplyTweetModal(event) {
    if(event.target.className == 'close-modal' || event.target.className == 'replyModal') {
      this.setState({
        display: 'none',
      })
    }
  }

  render() {
    let tweet = this.state.tweet;
    if(tweet) {
      return React.createElement('div', {className: 'replyModal', style: {display: this.state.display}, onClick: (event) => this.closeReplyTweetModal(event)},
        React.createElement('div', {className: 'modal-content'},
          React.createElement('button', {className: 'close-modal', onClick: (event) => this.closeReplyTweetModal(event)}, '\u00D7'),
          React.createElement('h1', {className: 'header'}, 'Reply to Tweet'),
          React.createElement(Tweet, {tweet: tweet, options: {showReplyButton: false, showUserHandle: true}}),
          React.createElement(PostTweetUI, {tweet: tweet, isReply: true})));
    } else {
      return null;
    }
  }
}

module.exports = ReplyTweet;
