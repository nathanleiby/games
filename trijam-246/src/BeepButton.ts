import { Actor, Color, Engine } from "excalibur";

export class BeepButton extends Actor {
  constructor(props: { x: number; y: number; color: Color; handler: any }) {
    super({
      x: props.x,
      y: props.y,
      width: 64,
      height: 64,
      color: props.color,
    });
    this.on("pointerdown", props.handler);
  }

  onInitialize(_engine: Engine) {}
}
