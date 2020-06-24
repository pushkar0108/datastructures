"use strict";

class BellmanFord {
  constructor(numberOfVertices, edges = []) {
    this.V = numberOfVertices;
    this.edges = edges;
  }

  findShortestDistanceFromSource(source) {
    let dist = [];
    for(let i=0; i<this.V; i++) {
      dist.push(Infinity);
    }
    dist[source] = 0;

    for(let i=0; i<this.V-1; i++) {
      for(let j=0; j<this.edges.length; j++) {
        let [source, destination, distance] = this.edges[j];
        if(dist[source] != Infinity && dist[source] + distance < dist[destination]) {
          dist[destination] = dist[source] + distance;
        }
      }
    }

    // if graph have negative weight cycle, it cannot be solved
    for(let j=0; j<this.edges.length; j++) {
      let [source, destination, distance] = this.edges[j];
      if(dist[source] != Infinity && dist[source] + distance < dist[destination]) {
        console.log("Negative cycle exist, graph cannot be solved");
        return;
      }
    }

    return dist;
  }
}

// Unit test
(() => {
  if (require.main == module) {
    let instance1 = new BellmanFord(
      5,
      [
        [0,1,-1], [0,2,4], [1,2,3], [1,3,2], [1,4,2], [3,2,5], [3,1,1], [4,3,-3]
      ]
    );

    let instance2 = new BellmanFord(
      4,
      [
        [0,1,4], [2,1,-10], [3,2,3], [0,3,5], [1,3,5]
      ]
    );

    console.log("Graph 1 | Shortest distance from source 0 - ", instance1.findShortestDistanceFromSource(0));
    console.log("Graph 2 | Shortest distance from source 0 - ", instance2.findShortestDistanceFromSource(0));
  }
})();
