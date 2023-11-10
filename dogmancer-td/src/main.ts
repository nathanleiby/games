import { gameState } from "./gamestate";
import "./style.css";

// ES style import from excalibur
import { Actor, CollisionType, Color, Engine, Input } from "excalibur";
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

// ---

const player = new Actor({
  x: 100,
  y: 300,
  radius: 20,
  // Set the color
  color: Color.Green,
  collisionType: CollisionType.Active,
});

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

game.onPreUpdate = (engine, _delta) => {
  player.vel.x = 0;
  player.vel.y = 0;

  // Player input
  if (
    engine.input.keyboard.isHeld(Input.Keys.Left) ||
    engine.input.keyboard.isHeld(Input.Keys.A)
  ) {
    player.vel.x = -150;
  }

  if (
    engine.input.keyboard.isHeld(Input.Keys.Right) ||
    engine.input.keyboard.isHeld(Input.Keys.D)
  ) {
    player.vel.x = 150;
  }
  if (
    engine.input.keyboard.isHeld(Input.Keys.Up) ||
    engine.input.keyboard.isHeld(Input.Keys.W)
  ) {
    player.vel.y = -150;
  }

  if (
    engine.input.keyboard.isHeld(Input.Keys.Down) ||
    engine.input.keyboard.isHeld(Input.Keys.S)
  ) {
    player.vel.y = 150;
  }

  if (engine.input.keyboard.wasPressed(Input.Keys.B)) {
    const COST = 1;
    if (gameState.money < COST) {
      return;
    }

    // pay
    gameState.money -= COST;
    refreshUI();

    // build
    const x = player.transform.pos.x + 30;
    const y = player.transform.pos.y + 30;
    const tower = new Actor({
      x,
      y,

      width: 20,
      height: 20,

      // Set the color
      color: Color.Green.lighten(0.5),
      collisionType: CollisionType.Fixed,
    });

    game.add(tower);
  }
};

setupUI(game);

game.start();
