import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Scene,
  Timer,
  vec,
} from "excalibur";
import { Enemy, EnemyType } from "./enemy";
import { gameState } from "./gamestate";
import { HEIGHT, TAGS, WIDTH } from "./globals";
import { Player } from "./player";
import { Resources } from "./resources";
import { refreshUI, setupUI } from "./ui";

const spawnWave = (
  enemyCount: number,
  base: Actor,
  game: Engine,
  enemyType: EnemyType,
  spawnIntervalMs: number = 1000
) => {
  let timerIters = 0;
  const timer = new Timer({
    fcn: () => {
      // check if complete
      timerIters += 1;
      if (timerIters > enemyCount) {
        timer.cancel();

        // wave complete
        gameState.waveIdx += 1;

        return;
      }

      // spawn an enemy
      const enemy = new Enemy(vec(300, 300), enemyType);
      game.add(enemy);

      // setup enemy pathfinding
      enemy.actions.moveTo(base.transform.pos, 50);
    },
    repeats: true,
    interval: spawnIntervalMs,
  });
  game.add(timer);
  timer.start();
};

type WaveConfig = [number, EnemyType];

export class LevelOne extends Scene {
  waves: WaveConfig[] = [
    [5, EnemyType.Basic],
    [3, EnemyType.Strong],
  ];

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

    // const sprite = new ex.Sprite({
    //   image: image,
    //   sourceView: {
    //     // Take a small slice of the source image starting at pixel (10, 10) with dimension 20 pixels x 20 pixels
    //     x: 10,
    //     y: 10,
    //     width: 20,
    //     height: 20,
    //   },
    //   destSize: {
    //     // Optionally specify a different projected size, otherwise use the source
    //     width: 100,
    //     height: 100,
    //   },
    // });
    const bg = Resources.Images.levelOneBackgroundImage.toSprite();
    const background = new Actor({
      x: 0,
      y: 0,
      collisionType: CollisionType.PreventCollision,
    });
    // game.add(bg);

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

    setupUI(game);

    this.startWave = () => {
      const { waveIdx } = gameState;
      if (waveIdx >= this.waves.length) {
        console.log("level complete");
        gameState.money += 25;
        refreshUI();
        return;
      }

      const count = this.waves[waveIdx][0];
      const enemyType = this.waves[waveIdx][1];
      spawnWave(count, base, game, enemyType);

      refreshUI();
    };
  }

  startWave() {
    throw "todo";
  }
}
