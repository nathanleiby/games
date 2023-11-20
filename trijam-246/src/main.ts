import { Engine } from "excalibur";
import { LandingScreen } from "./LandingScreen";
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
  // suppressPlayButton: true,
});

game.start(loader);

game.addScene("landing", new LandingScreen());
game.addScene("level", new Level());
game.goToScene("landing");
