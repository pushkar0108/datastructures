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
    return parent of any given vertex
    Complexity - O(n)
  */ 
  find(vertex) {
    const parentArr = this.parentArr;
    return parentArr[vertex] == -1 ? vertex : this.find(parentArr[vertex]);
  }

  /*
    perform union of 2 subsets
    Complexity - O(n)
  */
  union(x, y) {
    const parentX = this.find(x);
    const parentY = this.find(y);
    this.parentArr[parentX] = parentY;
  }

  /*
    Complexity - O(EV) or O(N^2)
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
    g.addEdge(0, 2);

    if (g.isCycle())
      console.log("Graph contains cycle");
    else
      console.log("Graph doesn't contain cycle");
  }
})();
