import p5 from "p5";
import { sketch } from "./sketch.js";

let instance;

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    if (instance) {
      instance.remove(); // Cleanup p5 instance
    }
  });
}

instance = new p5(sketch);
