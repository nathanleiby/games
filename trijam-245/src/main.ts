import { Actor, CollisionType, Color, Engine } from "excalibur";
import {
  FLOOR_HEIGHT,
  GROUND_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./config";
import { loader } from "./loader";
import { Sheep } from "./sheep";
import "./style.css";

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
});
game.add(ground);

const wall = new Actor({
  x: 384,
  y: FLOOR_HEIGHT - 32,
  width: 16,
  height: 128,
  color: Color.fromRGB(160, 100, 100),
  collisionType: CollisionType.Fixed,
});

game.add(wall);

// Actors
const sheep = new Sheep({ x: 64, y: FLOOR_HEIGHT });
game.add(sheep);
const sheep2 = new Sheep({ x: 128, y: FLOOR_HEIGHT });
game.add(sheep2);

game.onPreUpdate = (_engine, _delta) => {};

game.start(loader);
