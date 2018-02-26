import React from "react";
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

module.exports = TwitterTabs;
