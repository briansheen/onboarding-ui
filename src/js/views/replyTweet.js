import React from "react";
import Tweet from './tweet.js';
import TwitterService from '../services/twitterService.js';
import ReplyListener from './replyListener.js';
import PostTweetUI from './postTweet.js';
import Avatar from './avatar.js';

class ReplyTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      tweet: null,
      numChars: 0,
      replyTweetButtonDisabled: true,
      replyTweetText: '',
      postStatus: 'pending',
    }
    this.openReplyTweetModal = this.openReplyTweetModal.bind(this);
    ReplyListener.subscribe(this.openReplyTweetModal);
  }

  openReplyTweetModal(tweet) {
    this.setState({
      display: 'block',
      tweet: tweet,
    })
  }

  closeReplyTweetModal() {
    let replyText = document.getElementById('replyTweetText');
    replyText.value = '';
    this.setState({
      display: 'none',
      numChars: 0,
      replyTweetText: '',
      postStatus: 'pending',
    })
  }

  preparePost(event) {
    let replyTweetText = event.target.value;
    let numChars = replyTweetText.length;
    this.setState({
      numChars: numChars,
      replyTweetButtonDisabled: !(numChars > 0 && numChars <= 280),
      replyTweetText: replyTweetText,
      postStatus: 'pending',
    });
  }

  replyAndGetResponse() {
    let twitterService = new TwitterService;
    let postResponse;
    twitterService.replyTweet(this.state.replyTweetText, this.state.tweet.id).then(res => {
      res ? this.setState({postStatus: 'success'}) : this.setState({postStatus: 'fail'});
    });
  }

  render() {
    let tweet = this.state.tweet;
    if(tweet) {
      let user = tweet.twitterUser;
      let date = new Date(tweet.createdAt);
      let formattedDate = date.toLocaleDateString('en-US', {month:'short', day:'2-digit'});
      let postStatus = this.state.postStatus;
      return React.createElement('div', {className: 'replyModal', style: {display: this.state.display}},
        React.createElement('div', {className: 'modal-content'},
          React.createElement('button', {className: 'close-modal', onClick: () => this.closeReplyTweetModal()}, '\u00D7'),
          React.createElement('h1', {className: 'header'}, 'Reply to Tweet'),
          React.createElement('div', {className: 'tweet'},
            React.createElement(Avatar, {user: user, isHomeTimeline: true}),
            React.createElement('div', {className: 'content'},
              React.createElement('div', {className: 'date'}, formattedDate),
              React.createElement('a', {className: 'link', target: '_blank', href: `https://twitter.com/${user.twitterHandle}/status/${tweet.id}`},
                React.createElement('div', {className: 'msg'}, `${tweet.message}`)))),
          React.createElement('div', {className: 'replyTweet'},
            React.createElement('div', {className: 'replyTweetWrapper'},
              React.createElement('textarea', {id: 'replyTweetText', maxLength: '280', type: 'text', onKeyUp: (event) => this.preparePost(event)}),
              React.createElement('span', {className: 'characterCount'}, this.state.numChars),
              React.createElement('div', {className: 'replyTweetFeatures'},
                React.createElement('span', {className: 'replyTweetResult'},
                  postStatus === 'success' ? React.createElement('span', {className: 'successText'}, 'Successful Post') :
                  postStatus === 'fail' ? React.createElement('span', {className: 'failText'}, 'Failed to Post') : null),
                React.createElement('button', {className: 'replyTweetButton', type: 'button', disabled: this.state.replyTweetButtonDisabled, onClick: () => this.replyAndGetResponse()}, 'Reply')
              )
            )
          )
        )
      );
    } else {
      return null;
    }
  }
}

module.exports = ReplyTweet;
