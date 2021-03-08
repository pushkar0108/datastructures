/*
  Disjoint sets -
	detect cycle in a graph
*/
"use strict";
class Graph {
  constructor(numberOfVertices) {
    this.V = numberOfVertices;
    this.edges = [];
    this.parentArr = [];

    for (let i = 0; i < this.V; i++) {
      this.parentArr.push(-1);
    }
  }

  addEdge(a, b) {
    this.edges.push([a, b]);
  }

  /* 
    - return parent index of any given vertex
    - [[[ uses path compression technique ]]]
    - Complexity - O(LogN)
  */ 
  find(vertex) {
    const parentArr = this.parentArr;
    if(parentArr[vertex] < 0) { // negative value denotes that this is a set
      return vertex;
    } 
    
    parentArr[vertex] = this.find(parentArr[vertex]);
    return parentArr[vertex];
  }

  /* 
    - perform union of 2 subsets
    - [[[ uses union by rank ]]]
    - Complexity - O(LogN)
  */ 
  union(x, y) {
    const parentX = this.find(x);
    const parentY = this.find(y);

    const parentArr = this.parentArr;
    const parentXRank = -(parentArr[parentX]);
    const parentYRank = -(parentArr[parentY]);

    if(parentXRank >= parentYRank) {
      parentArr[parentX] += parentArr[parentY];
      parentArr[parentY] = parentX;
    } else {
      parentArr[parentY] += parentArr[parentX];
      parentArr[parentX] = parentY;
    }
  }

  /* 
    Complexity - O(ELOGV) or O(NLogN)
  */
  isCycle() {
    for (let i = 0; i < this.edges.length; i++) {
      const [src, dest] = this.edges[i];
      const srcParent = this.find(src);
      const destParent = this.find(dest);

      if (srcParent == destParent)
        return true;

      this.union(srcParent, destParent);
    }

    return false;
  }
}

// Unit test
(() => {
  if (require.main == module) {
    const g = new Graph(4);

    g.addEdge(0, 1);
    g.addEdge(1, 2);
    g.addEdge(0, 3);
    g.addEdge(0, 0);

    if (g.isCycle())
      console.log("Graph contains cycle");
    else
      console.log("Graph doesn't contain cycle");
  }
})();
