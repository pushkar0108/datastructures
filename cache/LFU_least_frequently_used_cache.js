"use strict";

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.frequency = 1;
    this.prev = null;
    this.next = null;
  }
}

class DLL {
  constructor() {
    this.count = 0;
    this.head = new Node();
    this.tail = new Node();

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addNode(node) {
    
  }

  removeNode(node) {

  }
}

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.count = 0;
    
    this.hash = {};
    this.frequencyMap = {};
    this.minFrequency = 0;
  }

  get(key) {
    if(!this.hash[key]) {
      return false;
    }

    let node = this.hash[key];
    this.promote(node);
    return node.value;
  }

  set(key, val) {
    if(this.hash[key]) {
      let node = this.hash[key];
      node.value = val;
      this.promote(node);
    } else {
      if(this.count == this.capacity) {
        // remove lowest frequency node
        this.frequencyMap[this.minFrequency].remove();
        this.count--;
      }

      // add new node
      let node = new Node(key, val);
      this.addNode(node);
    }
  }

  removeNode(node) {
    this.frequencyMap[node.frequency].removeNode(node);
    this.count--;
    if(this.frequencyMap[node.frequency].count == 0) {
      delete this.frequencyMap[node.frequency];
    }

    // remove from hash?
    delete this.map[node.key];
  }

  addNode(node) {
    if(!this.frequencyMap[node.frequency]) {
      this.frequencyMap[node.frequency] = new DLL();
    }
    
    this.frequencyMap[node.frequency].addNode(node);
    this.count++;
    this.updateMinFrequency(node);
    this.map[node.key] = node.value;
  }

  updateMinFrequency(node) {
    this.minFrequency = Math.min(this.minFrequency, node.frequency);
  }

  promote(node) {
    this.removeNode(node);
    node.frequency++;
    this.addNode(node);
  }
}

// Unit test
(() => {
	if (require.main == module) {
		let cache = new LFUCache(2);
    console.log('setting key:value pair, 1:10');
    cache.set(1, 10); 
    console.log('setting key:value pair, 2:20'); 
    cache.set(2, 20); 
    console.log(`getting result for key 1: ${cache.get(1)}`);
    console.log('setting key:value pair, 3:30'); 
    cache.set(3, 30);
    console.log(`getting result for key 2: ${cache.get(2)}`);
    console.log('setting key:value pair, 4:40'); 
    cache.set(4, 40); 
    console.log(`getting result for key 1: ${cache.get(1)}`);
    console.log(`getting result for key 3: ${cache.get(3)}`);
    console.log(`getting result for key 4: ${cache.get(4)}`);
	}
})();
