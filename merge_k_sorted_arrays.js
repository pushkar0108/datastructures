"use strict";

class Helper {
  static merge2(a = [], b = []) {
    if (!a.length) {
      return b;
    }

    if (!b.length) {
      return a;
    }

    let c = [];
    let i = 0;
    let j = 0;

    while (i < a.length && j < b.length) {
      if (a[i] < b[j]) {
        c.push(a[i]);
        i++;
      } else {
        c.push(b[j]);
        j++;
      }
    }

    while (i < a.length) {
      c.push(a[i]);
      i++;
    }

    while (j < b.length) {
      c.push(b[j]);
      j++;
    }

    return c;
  }

  static mergeK(arrs) {
    if (arrs.length == 1) {
      return arrs[0];
    }

    let new_arrays = [];
    for (let i = 0; i < arrs.length; i = i + 2) {
      new_arrays.push(Helper.merge2(arrs[i], arrs[i + 1]));
    }

    return Helper.mergeK(new_arrays);
  }
}

// Unit test
(() => {
  if (require.main == module) {
    let sortedArray = Helper.mergeK([
      [1, 3, 4],
      [3, 5, 7],
      [4, 13, 19],
      [2, 6, 9],
      [11, 18, 30]
    ]);

    console.log("sortedArray - ", sortedArray);
  }
})();
