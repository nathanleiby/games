import { Actor, CollisionType, Color, Engine, Vector } from "excalibur";
import { gameState } from "./gamestate";
import { refreshUI } from "./ui";

export class Enemy extends Actor {
  constructor(position: Vector) {
    const { x, y } = position;
    super({
      x,
      y,
      radius: 10,
      color: Color.Red,
      collisionType: CollisionType.Fixed,
    });
  }

  onInitialize(engine: Engine): void {
    this.on("collisionstart", (e) => {
      if (e.other.hasTag("player")) {
        // player kills enemy, but takes 1 damage
        gameState.playerHealth -= 1;
        e.actor.kill();

        // earn money for killing enemy
        gameState.money += 1;

        refreshUI();
      }

      if (e.other.hasTag("base")) {
        // enemy damages base, then dies
        gameState.baseHealth -= 1;
        e.actor.kill();

        // a lil juice
        engine.currentScene.camera.shake(2, 2, 100);

        refreshUI();
      }
    });
  }
}
