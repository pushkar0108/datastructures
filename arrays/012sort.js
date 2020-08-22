"use strict";

const sortArr = nums => {
  if(!nums.length) {
    return nums;
  }

  let i = 0;
  let j = 0;
  let k = nums.length - 1;

  while(j <= k) {
    let el = nums[j];

    switch(el) {
      case 0:
        if(nums[i] == 1) {
          nums[i] = 0;
          nums[j] = 1;
          i++;
          j++;
        } else {
          nums[i] = 0;
          i++;
          j++;
        }
        break;
      case 1:
        j++;
        break;
      case 2:
        nums[j] = nums[k];
        nums[k] = 2;
        k--;
        break;
    }
  }

  return nums;
};

// Unit test
(() => {
  if (require.main == module) {
    let arr = [0,1,2,1,2,1,2,0,0,0];
    console.log(`Before sorting ${arr}`);
    console.log(`After sorting ${sortArr(arr)}`);
  }
})();
