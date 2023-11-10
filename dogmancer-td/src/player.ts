import { Actor, CollisionType, Color, Engine, Input, Vector } from "excalibur";
import { gameState } from "./gamestate";
import { TAGS } from "./globals";
import { refreshUI } from "./ui";

export class Player extends Actor {
  constructor(position: Vector) {
    const { x, y } = position;
    super({
      x,
      y,
      radius: 20,
      // Set the color
      color: Color.Green,
      collisionType: CollisionType.Active,
    });
  }
  onInitialize(_engine: Engine): void {
    this.addTag(TAGS.PLAYER);
  }

  onPreUpdate(engine: Engine, _delta: number): void {
    this.vel.x = 0;
    this.vel.y = 0;

    // this input
    if (
      engine.input.keyboard.isHeld(Input.Keys.Left) ||
      engine.input.keyboard.isHeld(Input.Keys.A)
    ) {
      this.vel.x = -150;
    }

    if (
      engine.input.keyboard.isHeld(Input.Keys.Right) ||
      engine.input.keyboard.isHeld(Input.Keys.D)
    ) {
      this.vel.x = 150;
    }
    if (
      engine.input.keyboard.isHeld(Input.Keys.Up) ||
      engine.input.keyboard.isHeld(Input.Keys.W)
    ) {
      this.vel.y = -150;
    }

    if (
      engine.input.keyboard.isHeld(Input.Keys.Down) ||
      engine.input.keyboard.isHeld(Input.Keys.S)
    ) {
      this.vel.y = 150;
    }

    if (engine.input.keyboard.wasPressed(Input.Keys.B)) {
      const COST = 1;
      if (gameState.money < COST) {
        return;
      }

      // pay
      gameState.money -= COST;
      refreshUI();

      // build
      const x = this.transform.pos.x + 30;
      const y = this.transform.pos.y + 30;
      const tower = new Actor({
        x,
        y,

        width: 20,
        height: 20,

        // Set the color
        color: Color.Green.lighten(0.5),
        collisionType: CollisionType.Fixed,
      });

      engine.add(tower);
    }
  }
}
