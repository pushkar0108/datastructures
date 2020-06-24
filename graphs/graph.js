"use strict";
class Graph {
  constructor(nodeCount) {
    this.nodeCount = nodeCount;
    this.adjMap = {};
  }

  addEdge(a, b) {
    this.adjMap[a] = this.adjMap[a] || [];
    this.adjMap[a].push(b);
  }

  bfs(vertex) {
    let visited = [];
    for(let i=0; i<this.nodeCount; i++) {
      visited.push(false);
    }

    let queue = [vertex];
    while(queue.length) {
      let vertex = queue.shift();
      visited[vertex] = true;
      console.log(vertex);

      this.adjMap[vertex].forEach(node => {
        if(!visited[node]) {
          queue.push(node);
        }
      });
    }
  }
  
  // Time Complexity - O(V+E)
  dfs(vertex) {
    let visited = [];
    for(let i=0; i<this.nodeCount; i++) {
      visited.push(false);
    }

    this.dfsUtil(vertex, visited);
  }

  dfsUtil(vertex, visited) {
    visited[vertex] = true;
    console.log(vertex);

    this.adjMap[vertex].forEach(node => {
      if(!visited[node]) {
        this.dfsUtil(node, visited);
      }
    });
  }
  
  // Time Complexity - O(V+E)
  // Space Complexity - O(V) for stack
  topologicalSort() { // how to handle cycle?
    let visited = [];
    let stack = [];
    for(let i=0; i<this.nodeCount; i++) {
      visited.push(false);
    }

    for(let i=0; i<this.nodeCount; i++) {
      if(!visited[i]) {
        this.topologicalSortUtil(i, visited, stack);
      }
    }

    while(stack.length) {
      let vertex = stack.pop();
      console.log(vertex);
    }
  }

  topologicalSortUtil(vertex, visited, stack) {
    visited[vertex] = true;

    this.adjMap[vertex].forEach(node => {
      if(!visited[node]) {
        this.topologicalSortUtil(node, visited, stack);
      }
    });

    stack.push(vertex);
  }
}

// Unit test
(() => {
	if (require.main == module) {
		const g = new Graph(4);
    g.addEdge(0, 1); 
    g.addEdge(0, 2); 
    g.addEdge(1, 2); 
    g.addEdge(2, 0); 
    g.addEdge(2, 3); 
    g.addEdge(3, 3); 

    console.log("DFS starting from vertex 2");
    g.dfs(2); // 2 0 1 3

    console.log("BFS starting from vertex 2");
    g.bfs(2); // 2 0 3 1

    console.log("Topological Sort");
    g.topologicalSort(); // 0 1 2 3
	}
})();
