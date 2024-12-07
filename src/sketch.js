import p5 from "p5";

export const sketch = (p) => {
  let acc = 0;
  const timestep = 1000; // In milliseconds

  let state = {
    nodes: [],
    adjacencyMatrix: [],
  };

  const simulate = (fixedTimestep) => {
    console.log("Simulating after", fixedTimestep);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    window.onresize = () =>
      p.resizeCanvas(window.innerWidth, window.innerHeight);

    state.nodes = generateNodes(numFriends);
    state.adjacencyMatrix = generateAdjacencyMatrix(
      numFriends,
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
    p.fill(100, 150, 255);
    p.ellipse(p.mouseX, p.mouseY, 50, 50);
  };
};
