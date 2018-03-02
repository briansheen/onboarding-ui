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

  replyTweet(msg, replyToStatusId) {
    return fetch('http://localhost:8080/api/1.0/twitter/reply',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        replyMessage: msg,
        inReplyToStatusId: replyToStatusId,
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

module.exports = TwitterService;
