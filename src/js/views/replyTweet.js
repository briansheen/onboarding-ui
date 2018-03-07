import React from "react";
import Tweet from './tweet.js';
import PubSubListener from './pubSubListener.js';
import PostTweetUI from './postTweet.js';
import {PubSubEvents} from './pubSubEvents.js';

class ReplyTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayModal: false,
      tweet: null,
      postTweetText: '',
    }
    this.openReplyTweetModal = this.openReplyTweetModal.bind(this);
    PubSubListener.subscribe(PubSubEvents.REPLY, this.openReplyTweetModal);
  }

  openReplyTweetModal(tweet) {
    this.setState({
      displayModal: true,
      tweet: tweet,
      postTweetText: '',
    })
  }

  closeReplyTweetModal(event) {
    if(event.target.className.includes('close-modal') || event.target.className.includes('replyModal')) {
      this.setState({
        displayModal: false,
      })
    }
  }

  render() {
    let tweet = this.state.tweet;
    if(tweet) {
      let postTweetText = this.state.postTweetText || '';
      return React.createElement('div', {className: 'replyModal' + (this.state.displayModal ? ' active' : ''), onClick: (event) => this.closeReplyTweetModal(event)},
        React.createElement('div', {className: 'modal-content'},
          React.createElement('button', {className: 'close-modal', onClick: (event) => this.closeReplyTweetModal(event)}, '\u00D7'),
          React.createElement('h1', {className: 'header'}, 'Reply to Tweet'),
          React.createElement(Tweet, {tweet: tweet, options: {showReplyButton: false, showUserHandle: true}}),
          React.createElement(PostTweetUI, {tweet: tweet, postTweetText: postTweetText, isReply: true})));
    } else {
      return null;
    }
  }
}

module.exports = ReplyTweet;
