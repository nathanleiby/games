import { Actor, Engine } from "excalibur";
import { spriteSheet } from "./loader";

export class Sheep extends Actor {
  public onInitialize(_engine: Engine) {
    const sprite = spriteSheet.sprites[0];
    this.graphics.use(sprite);
  }
}
