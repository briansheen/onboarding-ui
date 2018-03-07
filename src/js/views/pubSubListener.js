class PubSubListener {

  constructor() {
    if(!PubSubListener.instance) {
      this.events = {};
      PubSubListener.instance = this;
    }
    return PubSubListener.instance;
  }

  subscribe(event, callback) {
    if(!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  publish(event, tweet) {
    if(!this.events[event]) {
      return;
    }
    this.events[event].forEach(function(reply){
        reply(tweet);
    });
  }
}

const instance = new PubSubListener();
Object.freeze(instance);
export default instance;
