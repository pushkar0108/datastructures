"use strict";

class SegmentTree {
  constructor(arr) {
    const height = Math.ceil(Math.log2(arr.length));
    const size = (2*Math.pow(2, height)) - 1;
    
    this.arr = arr; // we dont need complete array, we just need total size length
    this.segmentTree = [];
    for(let i=0; i<size; i++) {
      this.segmentTree.push(Infinity);
    }

    this.constructTree(arr, 0, arr.length-1, 0);
  }

  constructTree(arr, low, high, pos) {
    const segmentTree = this.segmentTree;

    if(low == high) {
      segmentTree[pos] = arr[low];
      return;
    }

    const mid = Math.floor((low+high)/2);
    this.constructTree(arr, low, mid, 2*pos+1);
    this.constructTree(arr, mid+1, high, 2*pos+2);
    segmentTree[pos] = Math.min(segmentTree[2*pos+1], segmentTree[2*pos+2]); // change this logic to handle max or min range queries
  }

  // get value from index i to index j
  getValue(qLow, qHigh) {
    if(qLow < 0 || qHigh >= this.arr.length || qHigh < qLow) {
      throw new Error("Invalid range query");
    }

    return this.getValueUtil(qLow, qHigh, 0, this.arr.length-1, 0);
  }

  getValueUtil(qLow, qHigh, low, high, pos) {
    const segmentTree = this.segmentTree;

    if(qLow <= low && qHigh >= high) { // total overlap
      return segmentTree[pos];
    }

    if(qLow > high || qHigh < low) {
      return Infinity; // change for min/max segment tree
    }

    const mid = Math.floor((low+high)/2);
    return Math.min(this.getValueUtil(qLow, qHigh, low, mid, 2*pos+1), this.getValueUtil(qLow, qHigh, mid+1, high, 2*pos+2));
  }
}

// Unit test
(() => {
  if (require.main == module) {
    const segmentTreeInstance = new SegmentTree([1, 2, 3, 4, 5, 6, 7, 8]);
    console.log(`Sum from index 0-4 is ${segmentTreeInstance.getValue(0, 4)}`);
    console.log(`Sum from index 0-0 is ${segmentTreeInstance.getValue(0, 0)}`);
    console.log(`Sum from index 5-5 is ${segmentTreeInstance.getValue(5, 5)}`);
    console.log(`Sum from index 4-7 is ${segmentTreeInstance.getValue(4, 7)}`);
    console.log(`Sum from index 0-7 is ${segmentTreeInstance.getValue(0, 7)}`);
    console.log(`Sum from index 2-9 is ${segmentTreeInstance.getValue(2, 9)}`); // Error range
  }
})();
