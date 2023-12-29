import { Color, DisplayMode, Engine, Physics, vec } from "excalibur";
import { DEBUG_FLAGS, SCREEN_HEIGHT, SCREEN_WIDTH } from "./config";
import { Level } from "./level";
import { loader } from "./loader";
import "./style.css";

const game = new Engine({
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  fixedUpdateFps: 60,
  // Turn off anti-aliasing for pixel art graphics
  // antialiasing: false
  canvasElementId: "game",
  displayMode: DisplayMode.FitScreen,
  backgroundColor: Color.Black,

  // For debugging
  suppressPlayButton: DEBUG_FLAGS.SUPRESS_PLAY_BUTTON,
});
Physics.gravity = vec(0, 200);

const level = new Level();
game.start(loader);

game.addScene("level", level);
game.goToScene("level");
