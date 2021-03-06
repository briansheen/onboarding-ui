import React from "react";
import _ from "lodash";
import Tweet from './tweet.js';
import TwitterService from '../services/twitterService.js';

class TweetList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tweetList: null,
      filterButtonDisabled: true,
      filterText: '',
    };
    this.getAndSetTweetList(props.isHomeTimeline);
  }

  setTweetList(tweetList) {
    this.setState({
      tweetList: tweetList,
    });
  }

  renderTweetList(tweetList, options, emptyMsg) {
    let tweets = [];
    let i = 0;
    if(tweetList.length > 0) {
      _.forEach(tweetList, tweet => {
        let props = {
          key: i,
          tweet: tweet,
          options: options ? {
            showUserHandle: options.showUserHandle,
            showReplyButton: options.showReplyButton,
          } : {},
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
    let filter = this.state.filterText;
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

  setButton(event) {
    let filterText = event.target.value;
    this.setState({
      filterText: filterText,
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
          React.createElement('input', {type: 'text', id: 'filter', value: this.state.filterText, onChange: (event) => this.setButton(event)}),
          React.createElement('button', {disabled: this.state.filterButtonDisabled, type: 'button', id: 'filterButton', onClick: () => this.getAndSetFilteredTweets()}, 'Filter')) : null,
        tweetList ? React.createElement('div', {className: 'tweetList'}, this.renderTweetList(tweetList, this.props.options, this.props.tweetsEmptyMsg)) : React.createElement('div', null, 'Error Communicating with localhost:8080')));
  }
}

module.exports = TweetList;
