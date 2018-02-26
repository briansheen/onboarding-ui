import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

class TwitterTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '',
    }
  }

  openTab(tabId) {
    let tabContent = document.getElementsByClassName('tabContent');
    _.forEach(tabContent, content => {
      content.style.display = 'none';
    });

    this.setState({
      activeTab: tabId,
    });

    document.getElementById(tabId).style.display = 'block';
  }

  render() {
    return React.createElement('ul', {className: 'tabUL'},
        React.createElement('li', {type: 'none', className: 'tab' + (this.state.activeTab === 'timelineColumn' ? ' active' : ''), id: 'defaultTab', onClick: () => this.openTab('timelineColumn')}, 'Home Timeline'),
        React.createElement('li', {type: 'none', className: 'tab' + (this.state.activeTab === 'userTweetsColumn' ? ' active' : ''), onClick: () => this.openTab('userTweetsColumn')}, 'User Tweets'),
        React.createElement('li', {type: 'none', className: 'tab' + (this.state.activeTab === 'postTweetColumn' ? ' active' : ''), onClick: () => this.openTab('postTweetColumn')}, 'Post Tweet'));
  }
}

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
        postStatus === 'success' ? React.createElement('div', {className: 'successText'}, 'Successful Post') :
        postStatus === 'fail' ? React.createElement('div', {className: 'failText'}, 'Failed to Post') : React.createElement('div', {className: 'pendingText'}, ''),
        React.createElement('button', {className: 'postTweetButton', type: 'button', disabled: this.state.postTweetButtonDisabled, onClick: () => this.postAndGetResponse()}, 'Tweet')));
  }
}

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

class TwitterService {
  getHomeTimeline() {
    return fetch('http://localhost:8080/api/1.0/twitter/timeline')
    .then(res => {
      if(!res.ok){
        throw Error();
      }
      return res;
    })
    .then(res => res.json())
    .catch(err => {
      return null;
    });
  }

  getFilteredTimeline(filter) {
    return fetch('http://localhost:8080/api/1.0/twitter/filter?filter='+filter)
    .then(res => {
      if(!res.ok){
        throw Error();
      }
      return res;
    })
    .then(res => res.json())
    .catch(err => {
      return null;
    });
  }

  getUserTweets() {
    return fetch('http://localhost:8080/api/1.0/twitter/mytweets')
    .then(res => {
      if(!res.ok){
        throw Error();
      }
      return res;
    })
    .then(res => res.json())
    .catch(err => {
      return null;
    });
  }

  postTweet(msg) {
    return fetch('http://localhost:8080/api/1.0/twitter/tweet',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: msg
      }),
    })
    .then(res => {
      if(!res.ok){
        throw Error();
      }
      return res;
    })
    .then(res => res.json())
    .catch(err => {
      return null;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(React.createElement(TwitterTabs), document.getElementById('twitterTabs'));
  ReactDOM.render(React.createElement(TweetList,
    {
      headerMsg: 'My Home Timeline',
      tweetsEmptyMsg: 'No tweets are available',
      buttonText: 'Refresh Timeline',
      isHomeTimeline: true,
    }), document.getElementById('timelineColumn'));

  ReactDOM.render(React.createElement(TweetList,
    {
      headerMsg: 'My Posted Tweets',
      tweetsEmptyMsg: 'No tweets are available, post a tweet!',
      buttonText: 'Refresh My Tweets',
      isHomeTimeline: false,
    }), document.getElementById('userTweetsColumn'));

  ReactDOM.render(React.createElement(PostTweetUI), document.getElementById('postTweetColumn'));

  document.getElementById('defaultTab').click();
});
