import { Actor, CollisionType, Color, Engine, Scene, Timer } from "excalibur";
import { Background } from "./background";
import {
  DEBUG_FLAGS,
  FENCE_HEIGHT,
  FLOOR_HEIGHT,
  MAX_SHEEP,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./config";
import { gameState } from "./gameState";
import { Sounds } from "./loader";
import { Sheep, SheepVariety } from "./sheep";
import "./style.css";
import { sheepCountLabel, sleepyOverlay, zzzLabel, zzzLabel2 } from "./ui";

const GROUND_COLOR = Color.fromRGB(30, 160, 30, 0.5);

export class Level extends Scene {
  onInitialize(game: Engine): void {
    const bg = new Background();
    game.add(bg);

    const invisibleFloor = new Actor({
      x: SCREEN_WIDTH / 2,
      y: FLOOR_HEIGHT - 32,
      width: SCREEN_WIDTH,
      height: 1,
      color: Color.Red,
      // visible: false,
      collisionType: CollisionType.Fixed,
    });
    invisibleFloor.addTag("floor");
    game.add(invisibleFloor);

    const leftWall = new Actor({
      // off screen
      x: -8,
      y: SCREEN_HEIGHT - 2,
      width: 16,
      height: SCREEN_HEIGHT,
      color: Color.fromRGB(160, 100, 100),
      collisionType: CollisionType.Fixed,
    });

    game.add(leftWall);

    const fence = new Actor({
      x: SCREEN_WIDTH / 2 - 16,
      y: FLOOR_HEIGHT - 32,
      width: 16,
      height: FENCE_HEIGHT,
      color: Color.fromRGB(160, 100, 100, 0.5),
      collisionType: CollisionType.Fixed,
    });
    fence.addTag("fence");
    game.add(fence);

    game.add(sheepCountLabel);

    // Actors
    const spawnSheep = () => {
      const sheep = new Sheep({
        x: 64,
        y: FLOOR_HEIGHT - 500,
        variety:
          gameState.sheepCounted < 1
            ? SheepVariety.White
            : Math.random() < 0.8
            ? SheepVariety.White
            : SheepVariety.Black,
      });
      game.add(sheep);
    };

    const spawnTimer = new Timer({
      interval: 3000,
      fcn: () => {
        if (
          gameState.activeSheep <= 3 &&
          gameState.sheepCounted + gameState.activeSheep < MAX_SHEEP
        ) {
          spawnSheep();
        }
      },
      repeats: true,
    });
    game.add(spawnTimer);

    // gameplay
    spawnTimer.start();
    spawnSheep();

    // get sleepier..
    game.add(sleepyOverlay);
    game.add(zzzLabel);
    game.add(zzzLabel2);

    // TODO: re-enable
    if (!DEBUG_FLAGS.DISABLE_MUSIC) {
      Sounds.music.play(0.2);
    }
  }
}
