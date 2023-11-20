import {
  BaseAlign,
  Color,
  Font,
  FontUnit,
  Label,
  TextAlign,
  vec,
} from "excalibur";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./config";
import { gameState } from "./gameState";

export const currentLevelLabel = new Label({
  text: "Level #0",
  pos: vec(SCREEN_WIDTH - 128, 30),
  font: new Font({
    family: "impact",
    size: 24,
    unit: FontUnit.Px,
    color: new Color(255, 255, 255),
  }),
});

export const currentSequenceLengthLabel = new Label({
  text: "Beeps: 0",
  pos: vec(SCREEN_WIDTH - 128, 60),
  font: new Font({
    family: "impact",
    size: 24,
    unit: FontUnit.Px,
    color: new Color(255, 255, 255),
  }),
});

export const correctLabel = new Label({
  text: "",
  pos: vec(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2),
  font: new Font({
    family: "impact",
    size: 100,
    unit: FontUnit.Px,
    color: new Color(255, 255, 255),
    textAlign: TextAlign.Center,
    baseAlign: BaseAlign.Middle,
  }),
});

export function showCorrect(isCorrect: boolean) {
  correctLabel.text = isCorrect ? "Correct" : "Wrong!";
  correctLabel.actions.delay(500).callMethod(() => {
    correctLabel.text = "";
  });
}

export function refreshUI() {
  currentLevelLabel.text = `Level #${gameState.currentLevel}`;
  currentSequenceLengthLabel.text = `Beeps: ${gameState.currentSequenceLength}`;
}
