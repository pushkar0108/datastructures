"use strict";

class BItree {
  constructor(array) {
    this.array = array;
    this.tree = [];

    for (let i = 0; i <= array.length; i++)
      this.tree.push(0);

    for (let i = 0; i < array.length; i++)
      this.update(i, array[i]);
  }

  update(index, value) {
    // index in BITree[] is 1 more than the index in arr[]
    index = index + 1;

    // Traverse all ancestors and add 'value' 
    while (index <= this.array.length) {
      this.tree[index] += value;
      index += index & (-index); // Update index to that of parent
    }
  }

  getSum(index) {
    let sum = 0;
    index = index + 1;

    // Traverse ancestors of BITree[index] 
    while (index > 0) {
      sum += this.tree[index];
      index -= index & (-index); // Move index to parent node
    }
    return sum;
  }
}

// Unit test
(() => {
  if (require.main == module) {
    const BItreeInstance = new BItree([1, 2, 3, 4, 5, 6, 7, 8]);
    console.log(`Sum till index 4 is ${BItreeInstance.getSum(4)}`);
    console.log(`Sum till index 1 is ${BItreeInstance.getSum(1)}`);
    console.log(`Sum till index 7 is ${BItreeInstance.getSum(7)}`);
    console.log(`going to increment the value at index 2 by 3 ${BItreeInstance.update(2, 3)}`);
    console.log(`Sum till index 4 is ${BItreeInstance.getSum(4)}`);
    console.log(`Sum till index 1 is ${BItreeInstance.getSum(1)}`);
    console.log(`Sum till index 7 is ${BItreeInstance.getSum(7)}`);
  }
})();
