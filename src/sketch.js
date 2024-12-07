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

  function generateClusters(n) {
    let remainingPoints = n;
    const numClusters = p.random(n / 2, n);
    const clusters = [];
    for (let i = 0; i < numClusters; ++i) {
      const pointsPerCluster = i == numClusters - 1 ? remainingPoints : p.random(0, remainingPoints);
      remainingPoints -= pointsPerCluster;
      clusters.push({ pointsPerCluster, clusterRadius: p.random(0, 40) + 40 });
    }

    const points = [];

    for (let i = 0; i < numClusters; i++) {
      // Random center for each cluster
      const centerX = Math.random() * p.width;
      const centerY = Math.random() * p.height;

      const { pointsPerCluster, clusterRadius } = clusters[i];

      // Generate points around the center
      for (let j = 0; j < pointsPerCluster; j++) {
        // Generate a random angle and distance from the cluster center
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * clusterRadius / 2 + clusterRadius / 2;

        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        points.push(new Node(points.length, x, y, p.random(0, 1)));
      }
    }

    return points;
  }

  function generateNodes(n) {
    return generateClusters(n);
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
    state.adjacencyMatrix = generateAdjacencyMatrix(state.nodes.length, maxFriendliness);
  };

  p.draw = () => {
    acc += p.deltaTime;
    if (acc > timestep) {
      acc -= timestep;
      simulate(timestep);
    }

    p.background(200);

    p.stroke(150, 150, 150);
    const numNodes = state.nodes.length;
    for (let i = 0; i < numNodes; ++i) {
      for (let j = 0; j < numNodes; ++j) {
        if (i == j) continue;
        if (state.adjacencyMatrix[i * numNodes + j] > 0) {
          const inode = state.nodes[i];
          const jnode = state.nodes[j];
          p.line(
            inode.position.x,
            inode.position.y,
            jnode.position.x,
            jnode.position.y
          );
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
