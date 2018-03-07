import React from "react";
import TwitterService from '../services/twitterService.js';
import PubSubListener from './pubSubListener.js';

class PostTweetUI extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      postTweetText: props.postTweetText,
      postStatus: 'pending',
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps) {
      if(nextProps.postTweetText !== this.state.postTweetText) {
        this.setState({
          postTweetText: nextProps.postTweetText,
          postStatus: 'pending',
        });
      }
    }
  }

  preparePost(event) {
    this.setState({
      postTweetText: event.target.value,
      postStatus: 'pending',
    });
  }

  postAndGetResponse() {
    let twitterService = new TwitterService;
    this.props.isReply ?
      twitterService.replyTweet(this.state.postTweetText, this.props.tweet.id).then(res => {
        res ? this.setState({postStatus: 'success'}) : this.setState({postStatus: 'fail'})}) :
      twitterService.postTweet(this.state.postTweetText).then(res => {
        res ? this.setState({postStatus: 'success'}) : this.setState({postStatus: 'fail'});
    });
  }

  render() {
    let postStatus = this.state.postStatus;
    let postTweetText = this.state.postTweetText;
    let numChars = postTweetText.length;
    let postTweetButtonDisabled = !(numChars > 0 && numChars <= 280);
    return React.createElement('div', {className: 'postTweet'},
      React.createElement('div', {className: 'postTweetWrapper'},
        React.createElement('textarea', {className: 'postTweetText', maxLength: '280', type: 'text', value: postTweetText, onChange: (event) => this.preparePost(event)}),
        React.createElement('span', {className: 'characterCount'}, numChars),
        React.createElement('div', {className: 'postTweetFeatures'},
          React.createElement('span', {className: 'postTweetResult'},
            postStatus === 'success' ? React.createElement('span', {className: 'successText'}, 'Successful Post') :
            postStatus === 'fail' ? React.createElement('span', {className: 'failText'}, 'Failed to Post') : null),
          React.createElement('button', {className: 'postTweetButton', type: 'button', disabled: postTweetButtonDisabled, onClick: () => this.postAndGetResponse()}, this.props.isReply ? 'Reply' : 'Tweet')
        )
      )
    );
  }
}

module.exports = PostTweetUI;
