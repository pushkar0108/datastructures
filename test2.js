"use strict";
var GLOBAL_K;
var GLOBAL_S;
var getPermutation = function(n, k) {
    let options = [];
    for(let i=1; i<=n; i++) {
      options.push(i);
    }

    let visited = [];
    for(let i=1; i<=n; i++) {
      visited.push(false);
    }

    GLOBAL_K = k;
    print([], visited, options);
};

var print = function(current, visited, options) {
  if(current.length == options.length) {
    GLOBAL_K--;
    if(GLOBAL_K==0) {
      GLOBAL_S = current.join("");
    }
  }

  for(let i=0; i<options.length; i++) {
    if(!visited[i]) {
      current.push(options[i]);
      visited[i] = true;
      print(current, visited, options);
      current.pop();
      visited[i] = false;
    }
  }
};

getPermutation(4,9);