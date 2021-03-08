"use strict";

// exact equal to k
const solveExact = (arr, k) => {
  if(!arr.length) {
    return;
  }

  let start = 0;
  let end = arr.length-1;
  
  while(start < end) {
    let sum = arr[start] + arr[end];

    if(sum == k) {
      console.log("pair is: ", arr[start], arr[end]);
      start++;
    } else if(sum < k) {
      start++;
    } else {
      end--;
    }
  }
};

// return count of pair with sum < k
const solveLess = (arr, k) => {
  if(!arr.length) {
    return;
  }

  let start = 0;
  let end = arr.length-1;
  let count = 0;
  
  while(start < end) {
    let sum = arr[start] + arr[end];

    if(sum < k) {
      console.log("end, start: ", end, start);

      count += end - start;
      start++;
    } else {
      end--;
    }
  }

  return count;
};

// let arr = [-1, 0, 2, 3];
// // solveExact(arr, 2);
// console.log(solveLess(arr, 3));

const countPairWithSumK = (arr, k, start, end, fixedIndex) => {
  if(!arr.length) {
    return;
  }
  
  let count = 0;
  while(start < end) {
    let sum = arr[start] + arr[end];

    if(sum == k) {
      console.log(`triplet is: `, arr[start], arr[end], arr[fixedIndex]);
      count++;
      start++;
    } else if(sum < k) {
      start++;
    } else {
      end--;
    }
  }

  return count;
};

const countTripletWithSumK = (arr, k) => {
  if(!arr.length) {
    return;
  }

  let count = 0;
  for(let i=0; i<arr.length-2; i++) {
    count += countPairWithSumK(arr, k-arr[i], i+1, arr.length-1, i);
  }

  return count;
};

let arr = [-1, 0, 1, 2, 3];
console.log(countTripletWithSumK(arr, 3));