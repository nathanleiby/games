import { ImageSource, Loader, Sound, SpriteSheet } from "excalibur";
import background from "../images/4by3-background-rough.png";
import sheepWalk from "../images/sheep_walk.png";
import music from "../sounds/SleepHypnosis.mp3";
import coin01Sound from "../sounds/Sound02ogg/coin01.ogg";
import jump01Sound from "../sounds/Sound02ogg/jump01.ogg";
import key01Sound from "../sounds/Sound02ogg/key01.ogg";
import selectSound from "../sounds/Sound02ogg/select.ogg";
import select02Sound from "../sounds/Sound02ogg/select02.ogg";

export const Images = {
  playerSheet: new ImageSource(sheepWalk),
  background: new ImageSource(background),
};

export const Sounds = {
  music: new Sound(music),
  jump: new Sound(jump01Sound),
  coin: new Sound(coin01Sound),
  key01Sound: new Sound(key01Sound),
  select: new Sound(selectSound),
  select02: new Sound(select02Sound),
};

// // convenience wrapper
export const spriteSheet = SpriteSheet.fromImageSource({
  image: Images.playerSheet,
  grid: {
    rows: 4,
    columns: 4,
    spriteWidth: 128,
    spriteHeight: 128,
  },
  spacing: {
    // Optionally specify the offset from the top left of sheet to start parsing
    // originOffset: { x: 12, y: 12 },
    // Optionally specify the margin between each sprite
    // margin: { x: 64, y: 64 },
  },
});

export const loader = new Loader();
const allResources = { ...Images, ...Sounds };
for (const res in allResources) {
  // @ts-ignore
  loader.addResource(allResources[res]);
}
