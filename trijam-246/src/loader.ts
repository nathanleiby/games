import { ImageSource, Loader, Sound } from "excalibur";
import beep from "../sounds/beep.mp3";
import boop from "../sounds/boop.mp3";

// types workaround .. https://www.totaltypescript.com/concepts/type-string-cannot-be-used-to-index-type
export const Images: Record<string, ImageSource> = {};

export const Sounds: Record<string, Sound> = {
  beep: new Sound(beep),
  boop: new Sound(boop),
};

export const loader = new Loader();
const allResources = { ...Images, ...Sounds };
for (const res in allResources) {
  loader.addResource(allResources[res]);
}
