import { Actor, Vector } from "excalibur";
import { Images } from "./loader";

export class Background extends Actor {
  constructor() {
    super();
    const backgroundImage = Images.background.toSprite();
    this.graphics.use(backgroundImage);
    this.anchor = new Vector(0, 0);
  }
}
