import { Actor, CollisionType, Color, Engine, Timer } from "excalibur";
import {
  FENCE_HEIGHT,
  FLOOR_HEIGHT,
  GROUND_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./config";
import { gameState } from "./gameState";
import { loader } from "./loader";
import { Sheep } from "./sheep";
import "./style.css";
import { sheepCountLabel } from "./ui";

const game = new Engine({
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  fixedUpdateFps: 60,
  // Turn off anti-aliasing for pixel art graphics
  // antialiasing: false
  // displayMode: DisplayMode.FitScreen,

  // For debugging
  suppressPlayButton: true,
});

// Background

const ground = new Actor({
  x: 400,
  y: 600 - 64,
  width: 800,
  height: GROUND_HEIGHT,
  color: Color.fromRGB(30, 160, 30),
  collisionType: CollisionType.PreventCollision,
});
game.add(ground);

const invisibleFloor = new Actor({
  x: 400,
  y: 600 - 64 + 32,
  width: 800,
  height: 1,
  color: Color.Red,
  visible: false,
  collisionType: CollisionType.Fixed,
});
game.add(invisibleFloor);

const leftWall = new Actor({
  x: -8,
  y: SCREEN_HEIGHT - 2,
  width: 16,
  height: SCREEN_HEIGHT,
  color: Color.fromRGB(160, 100, 100),
  collisionType: CollisionType.Fixed,
});

game.add(leftWall);

const fence = new Actor({
  x: 384,
  y: FLOOR_HEIGHT - 32,
  width: 16,
  height: FENCE_HEIGHT,
  color: Color.fromRGB(160, 100, 100),
  collisionType: CollisionType.Fixed,
});
fence.addTag("fence");
game.add(fence);

game.add(sheepCountLabel);

// Actors
game.onPreUpdate = (_engine, _delta) => {};

const spawnSheep = () => {
  const sheep = new Sheep({ x: 64, y: FLOOR_HEIGHT });
  game.add(sheep);
};

const spawnTimer = new Timer({
  interval: 3000,
  fcn: () => {
    if (gameState.activeSheep <= 3) {
      spawnSheep();
    }
  },
  repeats: true,
});
game.add(spawnTimer);

game.start(loader);

// gameplay
spawnTimer.start();
spawnSheep();
