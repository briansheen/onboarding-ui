import React from "react";
import TwitterService from '../services/twitterService.js';
import PubSubListener from './pubSubListener.js';

class PostTweetUI extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numChars: 0,
      postTweetButtonDisabled: true,
      postTweetText: props.postTweetText,
      postStatus: 'pending',
    }
  }

  componentWillReceiveProps(nextProps){
    let postTweetText = nextProps.postTweetText;
    let numChars = postTweetText.length;
    if(postTweetText !== this.state.postTweetText) {
      this.setState({
        numChars: numChars,
        postTweetButtonDisabled: !(numChars > 0 && numChars <= 280),
        postTweetText: postTweetText,
        postStatus: 'pending',
      });
    }
  }

  preparePost(event) {
    let postTweetText = event.target.value;
    let numChars = postTweetText.length;
    this.setState({
      numChars: numChars,
      postTweetButtonDisabled: !(numChars > 0 && numChars <= 280),
      postTweetText: postTweetText,
      postStatus: 'pending',
    });
  }

  postAndGetResponse() {
    let twitterService = new TwitterService;
    let postResponse;
    this.props.isReply ?
      twitterService.replyTweet(this.state.postTweetText, this.props.tweet.id).then(res => {
        res ? this.setState({postStatus: 'success'}) : this.setState({postStatus: 'fail'})}) :
      twitterService.postTweet(this.state.postTweetText).then(res => {
        res ? this.setState({postStatus: 'success'}) : this.setState({postStatus: 'fail'});
    });
  }

  render() {
    let postStatus = this.state.postStatus;
    return React.createElement('div', {className: 'postTweet'},
      React.createElement('div', {className: 'postTweetWrapper'},
        React.createElement('textarea', {className: 'postTweetText', maxLength: '280', type: 'text', value: this.state.postTweetText, onChange: (event) => this.preparePost(event)}),
        React.createElement('span', {className: 'characterCount'}, this.state.numChars),
        React.createElement('div', {className: 'postTweetFeatures'},
          React.createElement('span', {className: 'postTweetResult'},
            postStatus === 'success' ? React.createElement('span', {className: 'successText'}, 'Successful Post') :
            postStatus === 'fail' ? React.createElement('span', {className: 'failText'}, 'Failed to Post') : null),
          React.createElement('button', {className: 'postTweetButton', type: 'button', disabled: this.state.postTweetButtonDisabled, onClick: () => this.postAndGetResponse()}, this.props.isReply ? 'Reply' : 'Tweet')
        )
      )
    );
  }
}

module.exports = PostTweetUI;
