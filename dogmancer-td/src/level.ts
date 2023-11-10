import { Actor, CollisionType, Color, Engine, Scene, vec } from "excalibur";
import { Enemy } from "./enemy";
import { HEIGHT, TAGS, WIDTH } from "./globals";
import { Player } from "./player";
import { setupUI } from "./ui";

export class LevelOne extends Scene {
  onInitialize(game: Engine): void {
    const player = new Player(vec(200, 200));
    const enemy = new Enemy(vec(300, 300));

    const wall = new Actor({
      x: 400,
      y: 400,
      // Use a circle collider with radius 10
      width: 100,
      height: 10,

      // Set the color
      color: Color.Black,
      collisionType: CollisionType.Fixed,
    });

    const base = new Actor({
      x: WIDTH - 50 - 10,
      y: HEIGHT - 50 - 10,
      radius: 50,

      // Set the color
      color: Color.Green,
      collisionType: CollisionType.Passive,
    });
    base.addTag(TAGS.BASE);

    game.add(player);
    game.add(enemy);
    game.add(wall);
    game.add(base);

    // Setup enemy logic
    // pathing
    enemy.actions.moveTo(base.transform.pos, 10);
    // TODO: spawning

    setupUI(game);
  }
}
