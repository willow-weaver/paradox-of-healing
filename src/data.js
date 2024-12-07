// physics function // prottek ta tick e ki cholche
// prottek the rick e go through each node, iterate through and decide whether it gives a signal
// generate adjacency matrix in setup
// geenrate data of person
// geenrate connection between them
// 0 = no connection
// single dimension ith row jth column = i*n+j, size = n*n
import p5 from "p5";

export class Node {
  constructor(id, x, y, entropy) {
    this.id = id;
    this.position = { x, y };
    this.entropy = entropy;
  }
}
