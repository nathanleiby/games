import {
  Actor,
  CollisionType,
  Color,
  Font,
  FontUnit,
  Label,
  TextAlign,
  vec,
} from "excalibur";
import { DEBUG_FLAGS, MAX_SHEEP, SCREEN_HEIGHT, SCREEN_WIDTH } from "./config";
import { gameState } from "./gameState";

export const sheepCountLabel = new Label({
  text: "Sheep: 0",
  pos: vec(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - 360),
  font: new Font({
    family: "impact",
    size: 24,
    unit: FontUnit.Px,
    // baseAlign: BaseAlign.Top,
    textAlign: TextAlign.Center,
  }),
  color: Color.White,
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
  pos: vec(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - 80),
  font: new Font({
    family: "impact",
    size: 140,
    unit: FontUnit.Px,
    color: Color.White,
    textAlign: TextAlign.Center,
  }),
});
export const zzzLabel2 = new Label({
  // text: "(gg)",
  pos: vec(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2),
  font: new Font({
    family: "impact",
    size: 40,
    unit: FontUnit.Px,
    color: Color.White,
    textAlign: TextAlign.Center,
  }),
});

let numberToWord = (num: number) => {
  switch (num) {
    case 0:
      return "no";
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    case 7:
      return "seven";
    case 8:
      return "eight";
    case 9:
      return "nine";
    default:
      return "all";
  }
};

export function refreshUI() {
  sheepCountLabel.text = `${numberToWord(
    gameState.sheepCounted
  )} sheep ready for sleep`;
  sleepyOverlay.color = new Color(
    0,
    0,
    0,
    (gameState.sheepCounted / MAX_SHEEP) * 0.8
  );
  if (
    gameState.sheepCounted >= MAX_SHEEP ||
    (gameState.sheepCounted >= 1 && DEBUG_FLAGS.END_GAME_AT_ONE_SHEEP)
  ) {
    zzzLabel.text = "Zzz...";
    zzzLabel2.text = "(gg)";
  }
}
