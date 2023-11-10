import { gameState } from "./gamestate";
import "./style.css";

// ES style import from excalibur
import { Actor, CollisionType, Color, Engine, vec } from "excalibur";
import { Player } from "./player";
import { refreshUI, setupUI } from "./ui";

const WIDTH = 800;
const HEIGHT = 600;

const game = new Engine({
  width: WIDTH,
  height: HEIGHT,
  fixedUpdateFps: 60,
  // Turn off anti-aliasing for pixel art graphics
  // antialiasing: false
  // displayMode: DisplayMode.FitScreen,
});

const player = new Player(vec(200, 200));

const enemy = new Actor({
  x: 300,
  y: 300,
  // Use a circle collider with radius 10
  radius: 10,
  // Set the color
  color: Color.Red,
  collisionType: CollisionType.Fixed, // TODO: revisit. damage the player. damage the base
});

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

game.add(player);
game.add(enemy);
game.add(wall);
game.add(base);

enemy.actions.moveTo(base.transform.pos, 10);
// enemy.actions.moveTo(base.transform.pos, 200);

enemy.on("collisionstart", (e) => {
  if (e.other === player) {
    // player kills enemy, but takes 1 damage
    gameState.playerHealth -= 1;
    e.actor.kill();
    refreshUI();
  }

  if (e.other === base) {
    // enemy damages base, then dies
    gameState.baseHealth -= 1;
    e.actor.kill();
    refreshUI();
    game.currentScene.camera.shake(2, 2, 100);
  }
});

// game.onPreUpdate = (engine, _delta) => {};

setupUI(game);

game.start();
