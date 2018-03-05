import React from "react";
import ReactDOM from "react-dom";
import TwitterTabs from './views/twitterTabs.js';
import PostTweetTab from './views/postTweetTab.js';
import TweetList from './views/tweetList.js';
import ReplyTweet from './views/replyTweet.js';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(React.createElement(TwitterTabs), document.getElementById('twitterTabs'));
  ReactDOM.render(React.createElement(TweetList,
    {
      headerMsg: 'My Home Timeline',
      tweetsEmptyMsg: 'No tweets are available',
      buttonText: 'Refresh Timeline',
      isHomeTimeline: true,
      options: {
        showReplyButton: true,
        showUserHandle: true,
      }
    }), document.getElementById('timelineColumn'));

  ReactDOM.render(React.createElement(TweetList,
    {
      headerMsg: 'My Posted Tweets',
      tweetsEmptyMsg: 'No tweets are available, post a tweet!',
      buttonText: 'Refresh My Tweets',
      isHomeTimeline: false,
      options: {
        showReplyButton: false,
        showUserHandle: false,
      }
    }), document.getElementById('userTweetsColumn'));

  ReactDOM.render(React.createElement(PostTweetTab), document.getElementById('postTweetColumn'));
  ReactDOM.render(React.createElement(ReplyTweet), document.getElementById('replyTweetModal'));

  document.getElementById('defaultTab').click();
});
