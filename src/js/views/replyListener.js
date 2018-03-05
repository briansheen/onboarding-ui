class ReplyListener {

  constructor() {
    if(!ReplyListener.instance) {
      this.replys = new Array();
      ReplyListener.instance = this;
    }
    return ReplyListener.instance;
  }

  subscribe(event, callback) {
    if(!this.replys[event]) {
      this.replys[event] = [];
    }
    this.replys[event].push(callback);
  }

  publish(event, tweet) {
    if(!this.replys[event]) {
      return;
    }
    this.replys[event].forEach(function(reply){
        reply(tweet);
    });
  }
}

const instance = new ReplyListener();
Object.freeze(instance);
export default instance;


// let ReplyListener = function() {
//
//   let replys = new Array();
//
//   let subscribe = function(func) {
//     this.replys.push(func);
//   }
//
//   let publish = function(tweet) {
//     this.replys[0](tweet);
//   }
//
//   return {
//     replys: replys,
//     subscribe: subscribe,
//     publish: publish,
//   }
// } ();

// module.exports = ReplyListener;
