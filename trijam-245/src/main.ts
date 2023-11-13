import { Engine } from "excalibur";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./config";
import { Level } from "./level";
import { loader } from "./loader";
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

const level = new Level();
game.start(loader);

game.addScene("level", level);
game.goToScene("level");
