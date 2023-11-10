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
        gameState.waveNumber += 1;

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
      const waveIdx = gameState.waveNumber - 1;
      if (waveIdx >= this.waves.length) {
        gameState.levelNumber += 1;
        gameState.waveNumber = 1;
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
