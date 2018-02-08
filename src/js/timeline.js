import React from "react";
import ReactDOM from "react-dom";

class Tweet extends React.Component {
  render() {
    let props = this.props.props;
    let date = new Date(props.createdAt);
    let formattedDate = date.toLocaleDateString("en-US", {month:"short", day:"2-digit"});
    return React.createElement('div', {className: 'tweet'},
      React.createElement('div', {className: 'userInfo'},
        React.createElement('div', {className: 'img'},
          React.createElement('img', {src: `${props.profileImageUrl}`, className: 'img-circle'})),
        React.createElement('div', {className: 'name'}, `${props.name}`),
        React.createElement('div', {className: 'handle'}, `@${props.twitterHandle}`)
      ),
      React.createElement('div', {className: 'content'},
        React.createElement('div', {className: 'date'}, formattedDate),
        React.createElement('a', {className: 'link', target: '_blank', href: `https://twitter.com/${props.twitterHandle}/status/${props.id}`},
          React.createElement('div', {className: 'msg'}, `${props.message}`))
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
        name: timelineList[i].twitterUser.name,
        twitterHandle: timelineList[i].twitterUser.twitterHandle,
        profileImageUrl: timelineList[i].twitterUser.profileImageUrl,
        createdAt: timelineList[i].createdAt,
        id: timelineList[i].id,
        message: timelineList[i].message,
      };
      tweets.push(React.createElement(Tweet, {key: i, props: props}));
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
        ReactDOM.render(React.createElement(Tweets, {timelineList: timelineList}, null), document.getElementById('TL'));
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
  document.getElementById('refreshTL').addEventListener("click", () => {
    getTL();
  });
});
