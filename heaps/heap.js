"use strict";

class Node {
  constructor(value, frequency) {
    this.value = value;
    this.frequency = frequency;
  }
}

/*
  we swap the elements when comparator returns true
    if 
      parent > child, return true (min heap logic)
      parent < child, return true (max heap logic)
*/
class Heap {
  constructor(capacity, comparator) {
    this.capacity = capacity;
    this.comparator = comparator;

    this.heap = [];
    this.count = 0;
  }

  swap(a, b) {
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  insert(node) {
    if(this.count == this.capacity) {
      throw new Error("Heap out of memory");
    }

    this.heap[this.count] = node;
    let childIndex = this.count;
    let parentIndex = Math.floor((childIndex-1)/2);
    
    while(parentIndex > -1) {
      if(this.comparator(this.heap[parentIndex], this.heap[childIndex])) {
        this.swap(parentIndex, childIndex);
      }

      childIndex = parentIndex;
      parentIndex = Math.floor((childIndex-1)/2);
    }

    this.count++;
  }

  getTop() {
    if(!this.count) {
      throw new Error("Heap is empty");
    }

    return this.heap[0];
  }

  extractTop() {
    if(!this.count) {
      throw new Error("Heap already empty");
    }

    let top = this.heap[0];
    this.heap[0] = this.heap[this.count-1];
    this.count--;
    this.heapify(0);
    
    return top;
  }

  heapify(parentIndex) {
    let leftChildIndex = (2*parentIndex) + 1;
    let rightChildIndex = (2*parentIndex) + 2;

    let parent = this.heap[parentIndex];
    let leftChild = this.heap[leftChildIndex];
    let rightChild = this.heap[rightChildIndex];

    let next = parent;
    let next_index = parentIndex;

    if(leftChildIndex < this.count && this.comparator(next, leftChild)){
      next = leftChild;
      next_index = leftChildIndex;
    }

    if(rightChildIndex < this.count && this.comparator(next, rightChild)){
      next = rightChild;
      next_index = rightChildIndex;
    }

    if(parentIndex != next_index) {
      this.swap(parentIndex, next_index);
      this.heapify(next_index);
    }
  }
}

// Unit test
(() => {
	if (require.main == module) {
    let comparators = {
      minHeap: (parent , child) => {
        if(parent.frequency == child.frequency) {
          return parent.value > child.value ? true : false;
        }
  
        return parent.frequency > child.frequency ? true : false;
      },

      maxHeap: (parent , child) => {
        if(parent.frequency == child.frequency) {
          return child.value > parent.value ? true : false;
        }
  
        return child.frequency > parent.frequency ? true : false;
      }
    };

    console.log("----------- Max Heap -----------");
    let maxHeap = new Heap(5, comparators.maxHeap);
    maxHeap.insert(new Node("aaa", 1));
    maxHeap.insert(new Node("bbb", 2));
    maxHeap.insert(new Node("ccc", 1));
    maxHeap.insert(new Node("abcde", 2));
    console.log(`Extract top is : ${JSON.stringify(maxHeap.extractTop())}`);
    console.log(`Extract top is : ${JSON.stringify(maxHeap.extractTop())}`);
    console.log(`Extract top is : ${JSON.stringify(maxHeap.extractTop())}`);
    console.log(`Extract top is : ${JSON.stringify(maxHeap.extractTop())}`);

    console.log("----------- Min Heap -----------");
    let minHeap = new Heap(5, comparators.minHeap);
    minHeap.insert(new Node("aaac", 1));
    minHeap.insert(new Node("bbb", 2));
    minHeap.insert(new Node("aaaa", 1));
    minHeap.insert(new Node("abcde", 2));
    console.log(`Extract top is : ${JSON.stringify(minHeap.extractTop())}`);
    console.log(`Extract top is : ${JSON.stringify(minHeap.extractTop())}`);
    console.log(`Extract top is : ${JSON.stringify(minHeap.extractTop())}`);
    console.log(`Extract top is : ${JSON.stringify(minHeap.extractTop())}`);
	}
})();