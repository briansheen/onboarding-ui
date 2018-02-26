import React from "react";
import _ from "lodash";
import Tweet from './tweet.js';
import TwitterService from './twitterService.js';

class TweetList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tweetList: null,
      filterButtonDisabled: true,
    };
    this.getAndSetTweetList(props.isHomeTimeline);
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

  getAndSetFilteredTweets() {
    let twitterService = new TwitterService;
    let filter = document.getElementById('filter').value;
    if(filter) {
      twitterService.getFilteredTimeline(filter).then(tweetList => this.setTweetList(tweetList));
    }
  }

  getAndSetTweetList(isHomeTimeline) {
    let twitterService = new TwitterService;
    let twitterResponse;
    if(isHomeTimeline){
      twitterResponse = twitterService.getHomeTimeline();
    } else {
      twitterResponse = twitterService.getUserTweets();
    }
    twitterResponse.then(tweetList => this.setTweetList(tweetList));
  }

  setButton() {
    let filterText = document.getElementById('filter').value;
    this.setState({
      filterButtonDisabled: !(filterText.length > 0),
    });
  }

  render() {
    let tweetList = this.state.tweetList;
    let twitterService = new TwitterService;
    return React.createElement('div', {className: 'tweets'},
      React.createElement('div', {className: 'tweetListWrapper'},
        React.createElement('h1', {className: 'header'}, this.props.headerMsg),
        React.createElement('button', {type: 'button', className: 'tweetsButton', onClick: () => this.getAndSetTweetList(this.props.isHomeTimeline)}, this.props.buttonText),
        this.props.isHomeTimeline ? React.createElement('div', {className: 'filterTweetDiv'},
          React.createElement('input', {type: 'text', id: 'filter', onKeyUp: () => this.setButton()}),
          React.createElement('button', {disabled: this.state.filterButtonDisabled, type: 'button', id: 'filterButton', onClick: () => this.getAndSetFilteredTweets()}, 'Filter')) : null,
        tweetList ? React.createElement('div', {className: 'tweetList'}, this.renderTweetList(tweetList, this.props.isHomeTimeline, this.props.tweetsEmptyMsg)) : React.createElement('div', null, 'Error Communicating with localhost:8080')));
  }
}

module.exports = TweetList;
