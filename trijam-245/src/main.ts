import { Engine } from "excalibur";
import { HEIGHT, WIDTH } from "./config";
import { loader } from "./loader";
import { Sheep } from "./sheep";
import "./style.css";

const game = new Engine({
  width: WIDTH,
  height: HEIGHT,
  fixedUpdateFps: 60,
  // Turn off anti-aliasing for pixel art graphics
  // antialiasing: false
  // displayMode: DisplayMode.FitScreen,

  // For debugging
  suppressPlayButton: true,
});

// ad some sheep
const sheep = new Sheep({ x: 64, y: 64 });
game.add(sheep);
const sheep2 = new Sheep({ x: 128, y: 64 });
game.add(sheep2);

game.onPreUpdate = (_engine, _delta) => {};

game.start(loader);
