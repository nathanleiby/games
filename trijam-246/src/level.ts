import { Actor, CollisionType, Color, Engine, Scene } from "excalibur";
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

export class Level extends Scene {
  checkPuzzle = () => {
    if (gameState.playInput.length === gameState.desiredInput.length) {
      const isCorrect = gameState.playInput.every(
        (input, index) => input === gameState.desiredInput[index]
      );
      if (isCorrect) {
        console.log("correct");
        // TODO: next level
        resetPuzzle();
        playDesiredInput();
      } else {
        console.log("wrong");
        resetPuzzle();
        playDesiredInput();
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

    const newPuzzleButton = new Actor({
      x: 64,
      y: 64,
      width: 64,
      height: 64,
      color: Color.fromRGB(255, 255, 255),
    });
    game.add(newPuzzleButton);
    newPuzzleButton.on("pointerdown", async () => {
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
      Sounds.boop.play(1.0).then(() => {
        addPlayInput(BOOP);
        this.checkPuzzle();
      });
    });
  }
}
