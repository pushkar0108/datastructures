"use strict";
var minWindow = function(s, t) {
  if(!s.length) {
      return "";
  }
  
  let map = {};
  for(let i=0; i<t.length; i++) {
      if(!map[t[i]]) {
          map[t[i]] = 0;
      }
      
      map[t[i]] += 1;
  }
  
  let i = -1;
  let j = -1;
  
  let MIN_LEN = Infinity;
  let MIN_PAIR = [-1, -1];
  
  while(j < s.length && i <= j) {
      if(allPresent(map)) {
          let newLength = j - i;
          if(newLength < MIN_LEN) {
            MIN_LEN = newLength;
            MIN_PAIR = [i+1, j];
          }
          i++;
          let char = s[i];
          if(map[char] != undefined) {
              map[char] += 1;
          }
      } else {
          j++;
          let nextChar = s[j];
          if(map[nextChar] != undefined) {
              map[nextChar] -= 1;
          }
      }
  }
  
  return MIN_LEN == Infinity ? "" : getSubstring(s, MIN_PAIR[0], MIN_PAIR[1]);
};

var allPresent = map => {
  let flag = true;
  Object.keys(map).forEach(char => {
      if(map[char] > 0) {
          flag = false;
      } 
  });
  
  return flag;
};

var getSubstring = (s, i, j) => {
  let a = '';
  while(i <= j) {
    a = a.concat(s[i]);
    i++;
  }

  return a;
};

console.log(minWindow("ADOBECODEBANC", "ABC"));
console.log(minWindow("a", "a"));