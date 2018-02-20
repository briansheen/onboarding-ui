import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

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

class Tweet extends React.Component {
  render() {
    let tweet = this.props.tweet;
    let user = tweet.twitterUser;
    let date = new Date(tweet.createdAt);
    let formattedDate = date.toLocaleDateString('en-US', {month:'short', day:'2-digit'});
    return React.createElement('div', {className: 'tweet'},
      React.createElement(Avatar, {user: user, isHomeTimeline: this.props.isHomeTimeline}),
      React.createElement('div', {className: 'content'},
        React.createElement('div', {className: 'date'}, formattedDate),
        React.createElement('a', {className: 'link', target: '_blank', href: `https://twitter.com/${user.twitterHandle}/status/${tweet.id}`},
          React.createElement('div', {className: 'msg'}, `${tweet.message}`))
      )
    );
  }
}

class TweetList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tweetList: null,
    };
    this.getAndSetTweetList(props.url);
  }

  getAndSetTweetList(url) {
      fetch(url)
      .then(res => res.json())
      .then(res => this.setTweetList(res))
      .catch(err => this.setTweetList(null));
  }

  setTweetList(tweetList) {
    this.setState({
      tweetList: tweetList,
    });
  }

  renderTweetList(tweetList, isHomeTimeline, emptyMsg) {
    let tweets = [];
    let i = 0;
    if(tweetList.length > 0) {
      _.forEach(tweetList, tweet => {
        let props = {
          key: i,
          tweet: tweet,
          isHomeTimeline: isHomeTimeline,
        };
        tweets.push(React.createElement(Tweet, props));
        i += 1;
      });
    } else {
      tweets.push(emptyMsg);
    }
    return tweets;
  }

  render() {
    let tweetList = this.state.tweetList;
    if(tweetList){
      return React.createElement('div', {className: this.props.className},
        React.createElement('h1', {className: this.props.headerClass}, this.props.headerMsg),
        React.createElement('button', {type: 'button', className: this.props.button.className, onClick: () => this.getAndSetTweetList(this.props.url)}, this.props.button.text),
        React.createElement('div', {className: 'tweetList'}, this.renderTweetList(tweetList, this.props.isHomeTimeline, this.props.tweetsEmptyMsg)));
    } else {
      return React.createElement('div', {className: this.props.className},
        React.createElement('h1', {className: this.props.headerClass}, this.props.headerMsg),
        React.createElement('button', {type: 'button', className: this.props.button.className, onClick: () => this.getAndSetTweetList(this.props.url)}, this.props.button.text),
        React.createElement('div', null, 'Error Communicating with localhost:8080'));
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(React.createElement(TweetList,
    {
      className: 'timeline',
      url: 'http://localhost:8080/api/1.0/twitter/timeline',
      headerClass: 'timelineHeader',
      headerMsg: 'My Home Timeline',
      tweetsEmptyMsg: 'No tweets are available, follow someone!',
      button: {
        className: 'timelineButton',
        text: 'Refresh Timeline',
      },
      isHomeTimeline: true,
    }), document.getElementById('timelineColumn'));

  ReactDOM.render(React.createElement(TweetList,
    {
      className: 'myTweets',
      url: 'http://localhost:8080/api/1.0/twitter/mytweets',
      headerClass: 'myTweetsHeader',
      headerMsg: 'My Posted Tweets',
      tweetsEmptyMsg: 'No tweets are available, post a tweet!',
      button: {
        className: 'myTweetsButton',
        text: 'Refresh My Tweets',
      },
      isHomeTimeline: false,
    }), document.getElementById('userTweetsColumn'));
});
