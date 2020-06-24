"use strict";

class Dijiktras {
  constructor(adjMatrix) {
    this.matrix = adjMatrix;
  }

  static getShortestNonVisitedVertixIndex(dist, sptSet) {
    let min = Infinity;
    let index;

    for(let i=0; i<dist.length; i++) {
      if(!sptSet[i] && dist[i] <= min) {
        min = dist[i];
        index = i;
      }
    }

    return index;
  }

  findShortestDistanceFromSource(source) {
    let V = this.matrix.length;
    let dist = [];
    let sptSet = []; // shortest path tree set

    for(let i=0; i<V; i++) {
      dist.push(Infinity);
      sptSet.push(false);
    }

    dist[source] = 0;

    for(let i=0; i<V; i++) {
      let u = Dijiktras.getShortestNonVisitedVertixIndex(dist, sptSet);
      sptSet[u] = true;

      for(let j=0; j<V; j++) {
        if(!sptSet[j] && this.matrix[u][j] && (dist[u] + this.matrix[u][j] < dist[j])){
          dist[j] = dist[u] + this.matrix[u][j];
        }
      }
    }

    return dist;
  }
}

// Unit test
(() => {
  if (require.main == module) {
    let instance = new Dijiktras([
      [0,0,0,43,91],[1,0,59,23,4],[36,98,0,22,78],[16,51,59,0,75],[15,22,85,31,0]
    ]);

    console.log("Shortest distance from source 0 - ", instance.findShortestDistanceFromSource(4));
  }
})();
