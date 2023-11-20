import {
  Actor,
  BaseAlign,
  CollisionType,
  Color,
  Engine,
  Font,
  FontUnit,
  Label,
  Scene,
  TextAlign,
} from "excalibur";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./config";
import {
  BEEP,
  BOOP,
  addPlayInput,
  gameState,
  playDesiredInput,
  resetPuzzle,
} from "./gameState";
import { Sounds } from "./loader";
import "./style.css";
import {
  correctLabel,
  currentLevelLabel,
  currentSequenceLengthLabel,
  refreshUI,
  showCorrect,
} from "./ui";

export class Level extends Scene {
  checkPuzzle = () => {
    if (gameState.playInput.length === gameState.desiredInput.length) {
      const isCorrect = gameState.playInput.every(
        (input, index) => input === gameState.desiredInput[index]
      );
      if (isCorrect) {
        showCorrect(true);
        if (gameState.currentSequenceLength == 5) {
          gameState.currentSequenceLength = 1;
          gameState.currentLevel++;
          if (gameState.currentLevel == 2) {
            // TODO: victory condition
            gameState.isGameOver = true;
          }
        } else {
          gameState.currentSequenceLength++;
        }

        resetPuzzle();
        refreshUI();
        playDesiredInput();
      } else {
        showCorrect(false);
        gameState.isGameOver = true;
      }
    }
  };

  onInitialize(game: Engine): void {
    // First time puzzle
    resetPuzzle();
    playDesiredInput();

    // Background
    const background = new Actor({
      x: SCREEN_WIDTH / 2,
      y: SCREEN_HEIGHT / 2,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      color: Color.fromRGB(30, 30, 30),
      collisionType: CollisionType.PreventCollision,
    });
    game.add(background);

    // UI
    game.add(currentLevelLabel);
    game.add(currentSequenceLengthLabel);
    game.add(correctLabel);
    refreshUI();

    const retryButton = new Actor({
      x: 64,
      y: 64,
      radius: 40,
      color: Color.fromRGB(255, 255, 255),
    });
    game.add(retryButton);
    const retryLabel = new Label({
      text: "Retry",
      x: 64,
      y: 64,
      font: new Font({
        // opacity: 0,
        family: "impact",
        size: 24,
        unit: FontUnit.Px,
        // color: new Color(255, 255, 255),
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
      }),
      visible: true,
    });
    game.add(retryLabel);

    retryButton.on("pointerdown", async () => {
      resetPuzzle();
      await playDesiredInput();
    });

    const beepButton = new Actor({
      x: 384,
      y: SCREEN_HEIGHT - 64,
      width: 64,
      height: 64,
      color: Color.fromRGB(255, 0, 0),
      // collisionType: CollisionType.Fixed,
    });
    game.add(beepButton);
    beepButton.on("pointerdown", () => {
      if (gameState.isPlayingDesiredInput) return;

      Sounds.beep.play(1.0).then(() => {
        addPlayInput(BEEP);
        this.checkPuzzle();
      });
    });

    const boopButton = new Actor({
      x: 246,
      y: SCREEN_HEIGHT - 64,
      width: 64,
      height: 64,
      color: Color.fromRGB(0, 0, 255),
      // collisionType: CollisionType.Fixed,
    });
    game.add(boopButton);
    boopButton.on("pointerdown", () => {
      if (gameState.isPlayingDesiredInput) return;

      Sounds.boop.play(1.0).then(() => {
        addPlayInput(BOOP);
        this.checkPuzzle();
      });
    });
  }
}
