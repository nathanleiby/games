import { Actor, CollisionType, Engine, Scene, Timer } from "excalibur";
import { Background } from "./background";
import {
  COLLISION_OBJ_COLOR,
  DEBUG_FLAGS,
  FENCE_HEIGHT,
  FENCE_WIDTH,
  FENCE_X,
  FLOOR_HEIGHT,
  MAX_SHEEP,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./config";
import { gameState } from "./gameState";
import { Sounds } from "./loader";
import { Sheep, SheepVariety } from "./sheep";
import "./style.css";
import {
  refreshUI,
  sheepCountLabel,
  sleepyOverlay,
  zzzLabel,
  zzzLabel2,
} from "./ui";

export class Level extends Scene {
  onInitialize(game: Engine): void {
    const bg = new Background();
    game.add(bg);

    const invisibleFloor = new Actor({
      x: SCREEN_WIDTH / 2,
      y: FLOOR_HEIGHT - 32,
      width: SCREEN_WIDTH,
      height: 1,
      color: COLLISION_OBJ_COLOR,
      visible: DEBUG_FLAGS.VISIBLE_COLLISION_BOXES || false,
      collisionType: CollisionType.Fixed,
    });
    invisibleFloor.addTag("floor");
    game.add(invisibleFloor);

    const invisibleLeftWall = new Actor({
      // off screen
      x: 1,
      y: SCREEN_HEIGHT / 2,
      width: 1,
      height: SCREEN_HEIGHT,
      color: COLLISION_OBJ_COLOR,
      visible: DEBUG_FLAGS.VISIBLE_COLLISION_BOXES || false,
      collisionType: CollisionType.Fixed,
    });

    game.add(invisibleLeftWall);

    const fence = new Actor({
      x: FENCE_X,
      y: FLOOR_HEIGHT - 32,
      rotation: -Math.PI / 8,
      width: FENCE_WIDTH,
      height: FENCE_HEIGHT,
      color: COLLISION_OBJ_COLOR,
      collisionType: CollisionType.Fixed,
      visible: DEBUG_FLAGS.VISIBLE_COLLISION_BOXES || false,
    });
    fence.addTag("fence");
    game.add(fence);

    // Actors
    const SHEEP_HEIGHT = 48;
    const spawnSheep = () => {
      const sheep = new Sheep({
        x: 64,
        y: FLOOR_HEIGHT - SHEEP_HEIGHT,
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
    game.add(sheepCountLabel);
    game.add(sleepyOverlay);
    game.add(zzzLabel);
    game.add(zzzLabel2);
    refreshUI();

    // TODO: re-enable
    if (!DEBUG_FLAGS.DISABLE_MUSIC) {
      Sounds.music.play(0.2);
    }
  }
}
