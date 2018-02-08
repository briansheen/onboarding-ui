import React from "react";
import ReactDOM from "react-dom";

class Refresh extends React.Component {
  refreshTimeline() {
    getTL();
  }
  render() {
    return React.createElement('button', {type: 'button', onClick: this.refreshTimeline}, "Refresh Timeline");
  }
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
    let formattedDate = date.toLocaleDateString("en-US", {month:"short", day:"2-digit"});
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
  render() {
    let tweets = [];
    let timelineList = this.props.timelineList;
    for(let i = 0; i < timelineList.length; i++) {
      let props = {
        key: i,
        tweet: timelineList[i],
      };
      tweets.push(React.createElement(Tweet, props));
    }
    return tweets;
  }
}

function getTL(){
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if(xmlHttp.readyState === XMLHttpRequest.DONE){
      if(xmlHttp.status === 200){
        const timelineList = JSON.parse(xmlHttp.responseText);
        ReactDOM.render(React.createElement(Tweets, {timelineList: timelineList}), document.getElementById('TL'));
        ReactDOM.render(React.createElement(Refresh), document.getElementById('refreshTL'));
      } else {
        ReactDOM.render(React.createElement('div', null, "Error Communicating with localhost:8080"), document.getElementById('TL'));
      }
    }
  }
  xmlHttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
  xmlHttp.send();
}

document.addEventListener("DOMContentLoaded", () => {
  getTL();
});
