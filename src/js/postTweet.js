import React from "react";

class PostTweetUI extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numChars: 0,
      postTweetButtonDisabled: true,
      userTweetText: '',
      postStatus: 'pending',
    }
  }

  preparePost(event) {
    let userTweetText = event.target.value;
    let numChars = userTweetText.length;
    this.setState({
      numChars: numChars,
      postTweetButtonDisabled: !(numChars > 0 && numChars <= 280),
      userTweetText: userTweetText,
      postStatus: 'pending',
    });
  }

  postAndGetResponse() {
    let twitterService = new TwitterService;
    let postResponse;
    twitterService.postTweet(this.state.userTweetText).then(res => {
      res ? this.setState({postStatus: 'success'}) : this.setState({postStatus: 'fail'});
    });
  }

  render() {
    let postStatus = this.state.postStatus;
    return React.createElement('div', {className: 'postTweet'},
      React.createElement('div', {className: 'postTweetWrapper'},
        React.createElement('h1', {className: 'header'}, 'Post Tweet'),
        React.createElement('textarea', {id: 'userTweetText', maxLength: '280', type: 'text', onKeyUp: (event) => this.preparePost(event)}),
        React.createElement('span', {className: 'characterCount'}, this.state.numChars),
        React.createElement('div', {className: 'postTweetFeatures'},
          React.createElement('span', {className: 'postTweetResult'},
            postStatus === 'success' ? React.createElement('span', {className: 'successText'}, 'Successful Post') :
            postStatus === 'fail' ? React.createElement('span', {className: 'failText'}, 'Failed to Post') : null),
          React.createElement('button', {className: 'postTweetButton', type: 'button', disabled: this.state.postTweetButtonDisabled, onClick: () => this.postAndGetResponse()}, 'Tweet')
        )
      )
    );
  }
}

module.exports = PostTweetUI;
