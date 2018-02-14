import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

function UpdateTimelineButton(props) {
  return React.createElement('button',
    {
      type: 'button',
      onClick: props.onClick,
    },
    'Refresh Timeline');
}

class Avatar extends React.Component {
  render() {
    let user = this.props;
    return React.createElement('div', {className: 'userInfo'},
      React.createElement('div', {className: 'img'},
        React.createElement('img', {src: `${user.profileImageUrl}`, className: 'img-circle'})),
      React.createElement('div', {className: 'name'}, `${user.name}`),
      React.createElement('div', {className: 'handle'}, `@${user.twitterHandle}`)
    );
  }
}

class Tweet extends React.Component {
  render() {
    let tweet = this.props.tweet;
    let user = tweet.twitterUser;
    let date = new Date(tweet.createdAt);
    let formattedDate = date.toLocaleDateString('en-US', {month:'short', day:'2-digit'});
    return React.createElement('div', {className: 'tweet'},
      React.createElement(Avatar, user),
      React.createElement('div', {className: 'content'},
        React.createElement('div', {className: 'date'}, formattedDate),
        React.createElement('a', {className: 'link', target: '_blank', href: `https://twitter.com/${user.twitterHandle}/status/${tweet.id}`},
          React.createElement('div', {className: 'msg'}, `${tweet.message}`))
      )
    );
  }
}

class Tweets extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      timeline: null,
    }
    this.getAndSetTimeline();
  }

  setTimeline(timeline) {
    this.setState({
      timeline: timeline,
    });
  }

  getTimeline() {
    return new Promise((resolve, reject) =>
      fetch('http://localhost:8080/api/1.0/twitter/timeline')
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(null))
    );
  }

  renderTimeline(timeline){
    let tweets = [];
    let i = 0;
    _.forEach(timeline, tweet => {
      let props = {
        key: i,
        tweet: tweet
      }
      tweets.push(React.createElement(Tweet, props));
      i += 1;
    });
    return tweets;
  }

  getAndSetTimeline(){
    this.getTimeline()
      .then(res => this.setTimeline(res))
      .catch(err => this.setTimeline(err));
  }

  render() {
    let timeline = this.state.timeline;
    if(this.state.timeline){
      return React.createElement('div', null,
        React.createElement(UpdateTimelineButton, {onClick: () => this.getAndSetTimeline()}),
        React.createElement('div', {id: 'timeline'}, this.renderTimeline(timeline)));
    } else {
      return React.createElement('div', null,
        React.createElement(UpdateTimelineButton, {onClick: () => this.getAndSetTimeline()}),
        React.createElement('div', null, 'Error Communicating with localhost:8080'));
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(React.createElement(Tweets), document.getElementById('root'));
});
