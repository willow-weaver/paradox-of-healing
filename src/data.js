// physics function // prottek ta tick e ki cholche
// prottek the rick e go through each node, iterate through and decide whether it gives a signal
// generate adjacency matrix in setup
// geenrate data of person
// geenrate connection between them
// 0 = no connection
// single dimension ith row jth column = i*n+j, size = n*n

class Node {
  constructor(id, x, y, entropy) {
    this.id = id;
    this.position = { x, y };
    this.entropy = entropy;
  }
}

function generateNodes(n) {
  let nodes = [];
  for (let i = 0; i < n; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let entropy = random(0, 1); // entropy value between 0 and 1
    nodes.push(new Node(i, x, y, entropy));
  }
  return nodes;
}

function generateAdjacencyMatrix(n, maxFriendliness) {
  let matrix = new Array(n * n).fill(0); // Flat array
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let friendliness = floor(random(0, maxFriendliness + 1));
      matrix[i * n + j] = friendliness;
      matrix[j * n + i] = friendliness;
    }
  }
  return matrix;
}
