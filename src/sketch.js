import { Node } from "./data";

export const sketch = (p) => {
  let acc = 0;
  const timestep = 1000; // In milliseconds

  let numPeople = 50;
  let maxFriendliness = 10;

  let state = {
    nodes: [],
    adjacencyMatrix: [],
  };

  function generateNodes(n) {
    let nodes = [];
    for (let i = 0; i < n; i++) {
      let x = p.random(0, p.width);
      let y = p.random(0, p.height);
      let entropy = p.random(0, 1); // entropy value between 0 and 1
      nodes.push(new Node(i, x, y, entropy));
    }
    return nodes;
  }
  
  function generateAdjacencyMatrix(n, maxFriendliness) {
    let matrix = new Array(n * n).fill(0); // Flat array
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let friendliness = p.floor(p.random(0, maxFriendliness + 1));
        matrix[i * n + j] = friendliness;
        matrix[j * n + i] = friendliness;
      }
    }
    return matrix;
  }

  const simulate = (fixedTimestep) => {
    // console.log("Simulating after", fixedTimestep);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    window.onresize = () =>
      p.resizeCanvas(window.innerWidth, window.innerHeight);

    state.nodes = generateNodes(numPeople);
    state.adjacencyMatrix = generateAdjacencyMatrix(
      numPeople,
      maxFriendliness
    );
  };

  p.draw = () => {
    acc += p.deltaTime;
    if (acc > timestep) {
      acc -= timestep;
      simulate(timestep);
    }

    p.background(200);

    p.stroke(150, 150, 150);
    for (let i = 0; i < numPeople; ++i) {
      for (let j = 0; j < numPeople; ++j) {
        if (i == j) continue;
        if (state.adjacencyMatrix[i * numPeople + j] > 0) {
          const inode = state.nodes[i];
          const jnode = state.nodes[j];
          p.line(inode.position.x, inode.position.y, jnode.position.x, jnode.position.y);
        }
      }
    }

    p.fill(70, 70, 70);
    p.stroke(70, 70, 70);
    for (const node of state.nodes) {
      p.circle(node.position.x, node.position.y, 6);
    }
  };
};
