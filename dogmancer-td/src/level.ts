import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Scene,
  Timer,
  vec,
} from "excalibur";
import { Enemy } from "./enemy";
import { HEIGHT, TAGS, WIDTH } from "./globals";
import { Player } from "./player";
import { setupUI } from "./ui";

export class LevelOne extends Scene {
  onInitialize(game: Engine): void {
    const player = new Player(vec(200, 200));

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
    game.add(wall);
    game.add(base);

    this.startWave = () => {
      let timerIters = 0;
      const timer = new Timer({
        fcn: () => {
          timerIters += 1;
          if (timerIters > 10) {
            timer.cancel();
            return;
          }
          const enemy = new Enemy(vec(300, 300));
          game.add(enemy);
          enemy.actions.moveTo(base.transform.pos, 50);
        },
        repeats: true,
        interval: 2000,
      });
      game.add(timer);
      timer.start();
    };

    setupUI(game);
  }

  startWave() {
    // we override in onInitialize, so we can make a closure with needed game refs
    throw "startWave not set";
  }
}
