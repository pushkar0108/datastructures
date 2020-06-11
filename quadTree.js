"use strict";

class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Node {
  constructor(data, point) {
    this.data = data;
    this.point = point;
  }
}

class Quad {
  constructor(topLeft, botRight, minQuadSize = 1) {
    // Hold details of the boundary of this node 
    this.topLeft = topLeft;
    this.botRight = botRight;
    this.minQuadSize = minQuadSize;

    // Contains details of node 
    this.n = null;

    // Children of this tree
    this.topLeftTree = null;
    this.topRightTree = null;
    this.botLeftTree = null;
    this.botRightTree = null;
  }

  isSmallestQuad() {
    return (Math.abs(this.topLeft.x - this.botRight.x) <= this.minQuadSize &&
      Math.abs(this.topLeft.y - this.botRight.y) <= this.minQuadSize);
  }

  inBoundary(point) {
    return (point.x >= this.topLeft.x &&
      point.x <= this.botRight.x &&
      point.y >= this.topLeft.y &&
      point.y <= this.botRight.y);
  }

  insert(node) {
    if (!node) {
      throw new Error("Please provide a valid node to be inserted");
    }

    if (
      Math.abs(this.topLeft.x - this.botRight.x) <= this.minQuadSize &&
      Math.abs(this.topLeft.y - this.botRight.y) <= this.minQuadSize
    ) {
      this.n = node;
      return;
    }

    if ((this.topLeft.x + this.botRight.x) / 2 >= node.point.x) {
      if ((this.topLeft.y + this.botRight.y) / 2 >= node.point.y) {
        // top left
        if (this.topLeftTree == null) {
          this.topLeftTree = new Quad(
            new Point(this.topLeft.x, this.topLeft.y),
            new Point((this.topLeft.x + this.botRight.x) / 2, (this.topLeft.y + this.botRight.y) / 2)
          );
        }

        this.topLeftTree.insert(node);
      } else {
        // bottom left
        if (this.botLeftTree == null) {
          this.botLeftTree = new Quad(
            new Point(this.topLeft.x, (this.topLeft.y + this.botRight.y) / 2),
            new Point((this.topLeft.x + this.botRight.x) / 2, this.botRight.y)
          );
        }

        this.botLeftTree.insert(node);
      }
    } else {
      if ((this.topLeft.y + this.botRight.y) / 2 >= node.point.y) {
        // top right
        if (this.topRightTree == null) {
          this.topRightTree = new Quad(
            new Point((this.topLeft.x + this.botRight.x) / 2, this.topLeft.y),
            new Point(this.botRight.x, (this.topLeft.y + this.botRight.y) / 2)
          );
        }

        this.topRightTree.insert(node);
      } else {
        // bottom right
        if (this.botRightTree == null) {
          this.botRightTree = new Quad(
            new Point((this.topLeft.x + this.botRight.x) / 2, (this.topLeft.y + this.botRight.y) / 2),
            new Point(this.botRight.x, this.botRight.y)
          );
        }

        this.botRightTree.insert(node);
      }
    }
  }

  search(point) {
    if (!point || point.constructor != Point || !this.inBoundary(point)) {
      return null;
    }

    if (this.isSmallestQuad()) {
      return this.n;
    }

    if ((this.topLeft.x + this.botRight.x) / 2 >= point.x) {
      if ((this.topLeft.y + this.botRight.y) / 2 >= point.y) { // top left
        if (this.topLeftTree == null)
          return null;
        return this.topLeftTree.search(point);
      } else { // bottom left
        if (this.botLeftTree == null)
          return null;
        return this.botLeftTree.search(point);
      }
    } else {
      if ((this.topLeft.y + this.botRight.y) / 2 >= point.y) { // top right
        if (this.topRightTree == null)
          return null;
        return this.topRightTree.search(point);
      } else { // bottom right
        if (this.botRightTree == null)
          return null;
        return this.botRightTree.search(point);
      }
    }
  }
}

// Unit test
(() => {
  if (require.main == module) {
    let a = new Node(1, new Point(1, 1));
    let b = new Node(2, new Point(2, 5));
    let c = new Node(3, new Point(7, 6));

    const root = new Quad(new Point(0, 0), new Point(8, 8));
    root.insert(a);
    root.insert(b);
    root.insert(c);

    console.log(`Node a: ${root.search(new Point(1, 1)).data}`);
    console.log(`Node b: ${root.search(new Point(2, 5)).data}`);
    console.log(`Node c: ${root.search(new Point(7, 6)).data}`);
    console.log(`Node existing node: ${root.search(new Point(5, 5))}`);
  }
})();
