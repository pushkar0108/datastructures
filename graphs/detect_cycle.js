"use strict";

var isCyclicGraph = function(numCourses, prerequisites) {
  if(prerequisites.length < 2){
    return true;
  }

  let V = numCourses;

  let adjMap = {};
  for(let i=0; i<V; i++) {
    adjMap[i] = [];
  }
  
  prerequisites.forEach(obj => {
      let [d, s] = obj;
      adjMap[s].push(d);
  }); 

  let visited = [];
  let recStack = [];
  for(let i=0; i<V; i++) {
      visited.push(false);
      recStack.push(false);
  }
  
  for(let i=0; i<V; i++) {
    if(isCyclicUtil(i, adjMap, visited, recStack)){
      return true;
    }
  }

  return false;
};

var isCyclicUtil = function(source, adjMap, visited, recStack) {
  if(visited[source] && recStack[source]) {
      console.log("cycle present in graph");
      return true;
  } else if(visited[source]) {
    return false;
  } else {
    visited[source] = true;
    recStack[source] = true;

    for(let i=0; i<adjMap[source].length; i++) {
      if(isCyclicUtil(adjMap[source][i], adjMap, visited, recStack)){
        return true;
      }
    }

    recStack[source] = false;
    return false;
  }
};

let flag = isCyclicGraph(
  4,
  [[3,0],[0,1],[1,0]] // 0 is prerequisite for 3 (Edge 0 ---> 3)
);

console.log("isCyclicGraph: ", flag);