import { Engine, Font, FontUnit, Label, vec } from "excalibur";
import { gameState } from "./gamestate";

const moneyLabel = new Label({
  pos: vec(20, 20),
  font: new Font({
    family: "impact",
    size: 24,
    unit: FontUnit.Px,
  }),
});

const baseHealthLabel = new Label({
  pos: vec(20, 50),
  font: new Font({
    family: "impact",
    size: 24,
    unit: FontUnit.Px,
  }),
});

const playerHealthLabel = new Label({
  pos: vec(20, 80),
  font: new Font({
    family: "impact",
    size: 24,
    unit: FontUnit.Px,
  }),
});

const levelLabel = new Label({
  pos: vec(300, 40),
  font: new Font({
    family: "impact",
    size: 48,
    unit: FontUnit.Px,
  }),
});

const waveLabel = new Label({
  pos: vec(300, 100),
  font: new Font({
    family: "impact",
    size: 48,
    unit: FontUnit.Px,
  }),
});

export const refreshUI = () => {
  moneyLabel.text = `Money: ${gameState.money}`;
  baseHealthLabel.text = `Base Health: ${gameState.baseHealth}`;
  playerHealthLabel.text = `Player Health: ${gameState.playerHealth}`;
  levelLabel.text = `Level ${gameState.levelNumber}`;
  waveLabel.text = `Wave ${gameState.waveNumber}`;
};

export const setupUI = (game: Engine) => {
  game.add(moneyLabel);
  game.add(baseHealthLabel);
  game.add(playerHealthLabel);
  game.add(levelLabel);
  game.add(waveLabel);
  refreshUI();
};
