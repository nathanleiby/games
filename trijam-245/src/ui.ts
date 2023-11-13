import { Font, FontUnit, Label, vec } from "excalibur";
import { getSheepCounted } from "./gameState";

export const sheepCountLabel = new Label({
  text: "Sheep: 0",
  pos: vec(20, 30),
  font: new Font({
    family: "impact",
    size: 24,
    unit: FontUnit.Px,
  }),
});

export function refreshUI() {
  sheepCountLabel.text = `Sheep: ${getSheepCounted()}`;
}
