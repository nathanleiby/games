import {
  Actor,
  CollisionType,
  Color,
  Font,
  FontUnit,
  Label,
  vec,
} from "excalibur";
import { MAX_SHEEP, SCREEN_HEIGHT, SCREEN_WIDTH } from "./config";
import { gameState } from "./gameState";

export const sheepCountLabel = new Label({
  text: "Sheep: 0",
  pos: vec(20, 30),
  font: new Font({
    family: "impact",
    size: 24,
    unit: FontUnit.Px,
  }),
});

export const sleepyOverlay = new Actor({
  x: SCREEN_WIDTH / 2,
  y: SCREEN_HEIGHT / 2,
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  color: new Color(0, 0, 0, 0), // alpha overlay
  collisionType: CollisionType.PreventCollision,
});

export const zzzLabel = new Label({
  // text: "Zzz...",
  pos: vec(SCREEN_WIDTH / 2 - 130, SCREEN_HEIGHT / 2),
  font: new Font({
    family: "impact",
    size: 140,
    unit: FontUnit.Px,
    color: Color.White,
  }),
  // visible: false, // TODO: toggling visible not working
});
export const zzzLabel2 = new Label({
  // text: "(gg)",
  pos: vec(SCREEN_WIDTH / 2 - 50, SCREEN_HEIGHT / 2 + 80),
  font: new Font({
    family: "impact",
    size: 40,
    unit: FontUnit.Px,
    color: Color.White,
  }),
  // visible: false, // TODO: toggling visible not working
});

export function refreshUI() {
  sheepCountLabel.text = `Sheep: ${gameState.sheepCounted}`;
  sleepyOverlay.color = new Color(
    0,
    0,
    0,
    (gameState.sheepCounted / MAX_SHEEP) * 0.8
  );
  if (gameState.sheepCounted >= MAX_SHEEP) {
    zzzLabel.text = "Zzz...";
    zzzLabel2.text = "(gg)";
  }
}
