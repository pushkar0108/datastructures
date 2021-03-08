/*
  Rate limit - 
    user level
    10 R/Minute
*/

class Queue {
  constructor() {
    this.list = [];
  }

  get length() {
    return this.list.length;
  }

  get front() {
    return this.list[0];
  }

  insert(data) {
    this.list.push(data);
    console.log(`Queue after insert: ${this.list}`);
  }

  delete() {
    this.list.shift();
    console.log(`Queue after delete: ${this.list}`);
  }
}

class RateLimiter {
  constructor({
    count,
    duration,
    hashFn
  }) {
    this.count = count;
    this.duration = duration;
    this.hashFn = hashFn;
    this.bucketMap = {};
  }

  validate({request, timestamp = (new Date).getTime()}) {
    console.log(`Request received for user ${request.user} at time ${timestamp} ${new Date(timestamp)}`);
    let hash = this.hashFn(request);

    if(!this.bucketMap[hash]) {
      this.bucketMap[hash] = new Queue();
    }

    let bucket = this.bucketMap[hash];
    while(bucket.length > 0 && bucket.front <= timestamp - this.duration) {
      bucket.delete();
    }

    if(bucket.length >= this.count) {
      return false;
    }

    bucket.insert(timestamp);
    return true; 
  }
}

// unit tests
(() => {
  const rate4 = new RateLimiter({
    count: 4,
    duration: (4 * 1000), // per 4 seconds
    hashFn: request => request.user
  });

  let currentTime = (new Date).getTime();
  let requestA = {user: 'A'};
  let requestB = {user: 'B'};

  rate4.validate({ request: requestA, timestamp: currentTime});
  rate4.validate({ request: requestA, timestamp: currentTime + 1000});
  rate4.validate({ request: requestA, timestamp: currentTime + 2000});
  rate4.validate({ request: requestA, timestamp: currentTime + 2500});
  let res1 = rate4.validate({ request: requestA, timestamp: currentTime + 3000});
  let res2 = rate4.validate({ request: requestA, timestamp: currentTime + 4000});
  let res3 = rate4.validate({ request: requestA, timestamp: currentTime + 4100});
  let res4 = rate4.validate({ request: requestB, timestamp: currentTime + 4100});

  console.log("res1, res2, res3, res4: ", res1, res2, res3, res4); // should be false, true, false, true

  var assert = require('assert');
  console.log(assert.equal(res1, false));
  console.log(assert.equal(res1, true));
})();
