"use strict";

class MaxHeap {
  constructor(capacity) {
    this.heap = [];
    this.capacity = capacity;
  }

  swap(index1, index2) {
    let temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  heapify(parentIndex) {
    let leftChildIndex = (2*parentIndex) + 1;
    let rightChildIndex = (2*parentIndex) + 2;

    let parent = this.heap[parentIndex];
    let leftChild = this.heap[leftChildIndex];
    let rightChild = this.heap[rightChildIndex];

    let largest = parent;
    let largestIndex = parentIndex;

    if(leftChild && leftChild > largest) {
      largest = leftChild;
      largestIndex = leftChildIndex;
    }

    if(rightChild && rightChild > largest) {
      largest = rightChild;
      largestIndex = rightChildIndex;
    }

    if(largest != parent) {
      this.swap(parentIndex, largestIndex);
      this.heapify(largestIndex);
    }
  }

  getMax() {
    if(!this.heap.length) {
      throw new Error("Heap already empty");
    }

    return this.heap[0];
  }

  insert(num) {
    if(!num) {
      throw new Error("Please provide valid number to be inserted");
    }

    if(this.heap.length == this.capacity) {
      throw new Error("Heap capacity reached, cant add more numbers");
    }

    this.heap.push(num);
    let childIndex = this.heap.length - 1;
    let parentIndex = Math.floor((childIndex-1)/2);

    while(parentIndex > -1 && this.heap[parentIndex] < this.heap[childIndex]) {
      this.swap(parentIndex, childIndex);
      childIndex = parentIndex;
      parentIndex = Math.floor((childIndex-1)/2);
    }
  }

  extractMax() {
    if(!this.heap.length) {
      throw new Error("Heap already empty");
    }

    if(this.heap.length == 1) {
      return this.heap.pop();
    }

    let root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapify(0); // root index
    return root;
  }
}

// Unit test
(() => {
	if (require.main == module) {
		let myHeap = new MaxHeap(5);
    myHeap.insert(10);
    console.log(`Current max is : ${myHeap.getMax()}`);
    myHeap.insert(12);
    console.log(`Current max is : ${myHeap.getMax()}`);
    myHeap.insert(5);
    myHeap.insert(11);
    console.log(`Extract max is : ${myHeap.extractMax()}`);
    console.log(`Extract max is : ${myHeap.extractMax()}`);
    console.log(`Extract max is : ${myHeap.extractMax()}`);
    console.log(`Extract max is : ${myHeap.extractMax()}`);
    console.log(`Current max is : ${myHeap.getMax()}`);
	}
})();


