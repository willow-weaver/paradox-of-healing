import { Node } from "./data";
import p5 from "p5";

export const sketch = (p) => {
  let grid = []; // Array to store the grid points
  let gridSize = 15; // Size of each grid cell
  let controlPoint; // Point that controls the warp effect

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
      const pointsPerCluster =
        i == numClusters - 1 ? remainingPoints : p.random(0, remainingPoints);
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
        const distance =
          (Math.random() * clusterRadius) / 2 + clusterRadius / 2;

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

  function drawGrid() {

    // Draw the control point
    p.fill(255, 0, 0); // Red color for the control point
    //ellipse(controlPoint.x, controlPoint.y, 10, 10); // Draw the control point

    // Draw lines connecting grid points for visual aid
    p.stroke(150); // Gray color for grid lines
    for (let x = 0; x <= p.width; x += gridSize) {
      for (let y = 0; y < p.height; y += gridSize) {
        let p1 = p.createVector(x, y);
        let p2 = p.createVector(x, y + gridSize);
        p.line(
          warpPoint(p1).x,
          warpPoint(p1).y,
          warpPoint(p2).x,
          warpPoint(p2).y
        ); // Draw vertical lines
      }
    }

    for (let y = 0; y <= p.height; y += gridSize) {
      for (let x = 0; x < p.width; x += gridSize) {
        let p1 = p.createVector(x, y);
        let p2 = p.createVector(x + gridSize, y);
        p.line(
          warpPoint(p1).x,
          warpPoint(p1).y,
          warpPoint(p2).x,
          warpPoint(p2).y
        ); // Draw horizontal lines
      }
    }
  }

  function warpPoint(point) {
    // let controlPoint = createVector(x, y);

    // Calculate the distance from the point to the control point
    let distance = p.dist(point.x, point.y, controlPoint.x, controlPoint.y);

    // Maximum possible distance on the canvas (diagonal distance)
    let maxDist = p.dist(0, 0, p.width, p.height);

    if (distance > maxDist / 11) {
      return point;
    }

    // Map the distance to a warp factor: closer points get a larger factor, farther points a smaller factor
    // For example, distance 0 maps to 1.5, and maxDist maps to 0.5
    let factor = p.map(distance, 0, maxDist, 1.5, -4);

    // Calculate the direction vector from the control point to the current point
    let direction = p5.Vector.sub(point, controlPoint);

    // Scale the direction vector by the warp factor
    direction.mult(factor);

    // Add the scaled direction vector to the control point's position to get the new position
    return p5.Vector.add(controlPoint, direction);
  }

  const simulate = (fixedTimestep) => {
    // console.log("Simulating after", fixedTimestep);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    window.onresize = () =>
      p.resizeCanvas(window.innerWidth, window.innerHeight);

    // Initialize the grid points
    for (let x = 0; x <= 60; x += 4) {
      for (let y = 0; y <= 60; y += 4) {
        grid.push(p.createVector(x, y)); // Add points to the grid array
      }
    }

    // Initialize the control point in the center of the canvas
    controlPoint = p.createVector(p.width / 2, p.height / 2);

    state.nodes = generateNodes(numPeople);
    state.adjacencyMatrix = generateAdjacencyMatrix(
      state.nodes.length,
      maxFriendliness
    );
  };

  p.draw = () => {
    acc += p.deltaTime;
    if (acc > timestep) {
      acc -= timestep;
      simulate(timestep);
    }

    p.background(250);

    drawGrid();

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

  p.mouseMoved = () => {
    // Update the control point's position if dragging
    // if (dragging) {
      controlPoint.x = p.mouseX;
      controlPoint.y = p.mouseY;
    // }
  }
};
