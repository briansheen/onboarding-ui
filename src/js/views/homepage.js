import React from 'react';
import TwitterTabs from './twitterTabs.js';
import PostTweetTab from './postTweetTab.js';
import TweetList from './tweetList.js';
import ReplyTweet from './replyTweet.js';

class Homepage extends React.Component {
  render() {
    return React.createElement('div', {className: 'homepage-content'},
      React.createElement('div', {id: 'twitterTabs'},
        React.createElement(TwitterTabs)),
      React.createElement('div', {id: 'timelineColumn', className: 'tabContent'},
        React.createElement(TweetList,
          {
            headerMsg: 'My Home Timeline',
            tweetsEmptyMsg: 'No tweets are available',
            buttonText: 'Refresh Timeline',
            isHomeTimeline: true,
            options: {
              showReplyButton: true,
              showUserHandle: true,
            }
          })),
      React.createElement('div', {id: 'userTweetsColumn', className: 'tabContent'},
        React.createElement(TweetList,
          {
            headerMsg: 'My Posted Tweets',
            tweetsEmptyMsg: 'No tweets are available, post a tweet!',
            buttonText: 'Refresh My Tweets',
            isHomeTimeline: false,
            options: {
              showReplyButton: false,
              showUserHandle: false,
            }
          })),
      React.createElement('div', {id: 'postTweetColumn', className: 'tabContent'},
        React.createElement(PostTweetTab)),
      React.createElement('div', {id: 'replyTweetModal'},
        React.createElement(ReplyTweet)));
  }
}

module.exports = Homepage;
