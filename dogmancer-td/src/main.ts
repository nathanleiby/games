import { Engine, Input } from "excalibur";
import { HEIGHT, WIDTH } from "./globals";
import { LevelOne } from "./level";
import { loader } from "./resources";
import "./style.css";

const game = new Engine({
  width: WIDTH,
  height: HEIGHT,
  fixedUpdateFps: 60,
  // Turn off anti-aliasing for pixel art graphics
  // antialiasing: false
  // displayMode: DisplayMode.FitScreen,
});

const l1 = new LevelOne();
game.addScene("l1", l1);

game.onPreUpdate = (_engine, _delta) => {
  // // global pause/unpause
  // if (game.input.keyboard.wasPressed(Input.Keys.Space)) {
  //   if (game.isRunning()) {
  //     game.stop();
  //   } else {
  //     // TODO: can't unpause b/c stopped :P
  //     game.start();
  //   }
  // }

  // Debug Tools
  if (game.input.keyboard.wasPressed(Input.Keys.N)) {
    l1.startWave();
  }
};

game.goToScene("l1");
game.start(loader);
