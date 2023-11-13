import { ImageSource, Loader, SpriteSheet } from "excalibur";
import sheepWalk from "../images/sheep_walk.png";

export const Images = {
  playerSheet: new ImageSource(sheepWalk),
};

export const Sounds = {};

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
