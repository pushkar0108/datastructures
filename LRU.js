"use strict";

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.count = 0;
    this.hash = {};

    this.head = new Node();
    this.tail = new Node();

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  deleteNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;

    delete this.hash[node.key];
  }

  insertNode(node) {
    node.next = this.head.next;
    node.prev = this.head;

    this.head.next = node;
    node.next.prev = node;

    this.hash[node.key] = node;
  }

  set(key, value) {
    let node = this.get(key);

    if(node){ //node exist in LRU
      node.value = value;
      this.deleteNode(node);
      this.insertNode(node);
      return;
    }

    this.count++;
    let newNode = new Node(key, value);
    if(this.count <= this.capacity) {
      this.insertNode(newNode);
    }else{
      this.deleteNode(this.tail.prev);
      this.insertNode(newNode);
    }
  }

  get(key) {
    if(!this.hash[key]) {
      return false;
    }

    let node = this.hash[key];
    this.deleteNode(node);
    this.insertNode(node);
    return node.value;
  }
}

let cache = new LRUCache(2);
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