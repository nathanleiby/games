import { Color, Font, FontUnit, Label, vec } from "excalibur";
import { SCREEN_WIDTH } from "./config";
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

export function refreshUI() {
  currentLevelLabel.text = `Level #${gameState.currentLevel}`;
  currentSequenceLengthLabel.text = `Beeps: ${gameState.currentSequenceLength}`;
}
