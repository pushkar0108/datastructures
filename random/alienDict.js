"use strict";

const getDependencyGraph = (words) => {
  const adjMap = {};

  for(let i=1; i<words.length; i++) {
    let word1 = words[i-1];
    let word2 = words[i];

    let j=0;
    while(j<word1.length && j<word2.length && word1[j] == word2[j]) {
      j++;
    }

    if(j != word1.length || j != word2.length) {
      if(!adjMap[word1[j]]) {
        adjMap[word1[j]] = [];
      }
  
      if(!adjMap[word2[j]]) {
        adjMap[word2[j]] = [];
      }
  
      adjMap[word2[j]].push(word1[j]);
    }
  }

  return adjMap;
};

const topologicalSort = (adjMap) => {
  const visitedMap = {};
  Object.keys(adjMap).forEach(vertex => {
    visitedMap[vertex] = false;
  });

  const stack = [];
  Object.keys(adjMap).forEach(vertex => {
    topologicalSortUtil(vertex, adjMap, visitedMap, stack);
  });

  return stack;
};

const topologicalSortUtil = (vertex, adjMap, visitedMap, stack) => {
  if(visitedMap[vertex]) {
    return;
  }

  visitedMap[vertex] = true;
  adjMap[vertex].forEach(vertex => {
    topologicalSortUtil(vertex, adjMap, visitedMap, stack);
  });

  stack.push(vertex);
};

const getSequence = (words) => {
  if(words.length < 2) {
    return [];
  }

  let adjMap = getDependencyGraph(words);
  return topologicalSort(adjMap);
};

const words = ["caa", "aaa", "aab"];
const res = getSequence(words);
console.log(`Words are ${words}, Sequence is ${res}`);