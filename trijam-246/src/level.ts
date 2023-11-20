import {
  ActionSequence,
  Actor,
  BaseAlign,
  CollisionType,
  Color,
  EasingFunctions,
  EmitterType,
  Engine,
  Font,
  FontUnit,
  Label,
  ParallelActions,
  ParticleEmitter,
  RotationType,
  Scene,
  TextAlign,
  Vector,
  vec,
} from "excalibur";
import { BeepButton } from "./BeepButton";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./config";
import {
  BEEP,
  BOOP,
  addPlayInput,
  gameState,
  generateNewPuzzle,
  playDesiredInput,
  retryPuzzle,
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

const BOOP_START_x = SCREEN_WIDTH / 2 + 128;
const BEEP_START_x = SCREEN_WIDTH / 2 - 128;
const BUTTON_START_Y = SCREEN_HEIGHT / 2;

const WHITE = Color.fromRGB(255, 255, 255);
export class Level extends Scene {
  startLevelZero = () => {};
  startLevelOne = () => {};
  startLevelTwo = () => {};
  youWin = () => {};

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
          switch (gameState.currentLevel) {
            case 1:
              this.startLevelOne();
              break;
            case 2:
              this.startLevelTwo();
              break;
            default:
              this.youWin();
              break;
          }
        } else {
          gameState.currentSequenceLength++;
        }

        generateNewPuzzle();
        refreshUI();
        playDesiredInput();
      } else {
        showCorrect(false);
        // TODO: count total errors? fail if too many
        retryPuzzle();
        // gameState.isGameOver = true;
      }
    }
  };

  onInitialize(game: Engine): void {
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

    const retryButton = new Actor({
      x: 64,
      y: 64,
      radius: 40,
      color: WHITE,
    });
    game.add(retryButton);
    const retryLabel = new Label({
      text: "Retry",
      x: 64,
      y: 64,
      font: new Font({
        family: "impact",
        size: 24,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
      }),
      visible: true,
    });
    game.add(retryLabel);

    retryButton.on("pointerdown", async () => {
      // reset player input
      gameState.playInput = [];
      await playDesiredInput();
    });

    // Beep
    const beepHandler = () => {
      if (gameState.isPlayingDesiredInput) return;
      Sounds.beep.play(1.0).then(() => {
        addPlayInput(BEEP);
        this.checkPuzzle();
      });
    };
    const beepButton = new BeepButton({
      x: BEEP_START_x,
      y: BUTTON_START_Y,
      color: Color.fromRGB(255, 0, 0),
      handler: beepHandler,
    });
    game.add(beepButton);

    // Boop
    const boopHandler = () => {
      if (gameState.isPlayingDesiredInput) return;

      Sounds.boop.play(1.0).then(() => {
        addPlayInput(BOOP);
        this.checkPuzzle();
      });
    };
    const boopButton = new BeepButton({
      x: BOOP_START_x,
      y: BUTTON_START_Y,
      color: Color.fromRGB(0, 0, 255),
      handler: boopHandler,
    });
    game.add(boopButton);

    this.startLevelZero = () => {
      beepButton.actions.clearActions();
      boopButton.actions.clearActions();

      // Level 0
      beepButton.actions.repeatForever((ctx) => {
        ctx.rotateBy(Math.PI, Math.PI / 5, RotationType.Clockwise);
      });
      boopButton.actions.repeatForever((ctx) => {
        ctx.rotateBy(Math.PI, Math.PI / 10, RotationType.CounterClockwise);
      });
    };

    this.startLevelOne = () => {
      beepButton.actions.clearActions();
      boopButton.actions.clearActions();

      // Level 1
      beepButton.actions.repeatForever((ctx) => {
        ctx.moveTo(BEEP_START_x, BUTTON_START_Y, 50);
        ctx.moveTo(SCREEN_WIDTH - BEEP_START_x, BUTTON_START_Y, 50);
      });

      boopButton.actions.repeatForever((ctx) => {
        ctx.moveTo(BOOP_START_x, BUTTON_START_Y, 100);
        ctx.moveTo(SCREEN_WIDTH - BOOP_START_x, BUTTON_START_Y, 100);
      });
    };

    this.startLevelTwo = () => {
      beepButton.actions.clearActions();
      boopButton.actions.clearActions();

      // Level 2
      const moveInBox = new ActionSequence(beepButton, (ctx) => {
        ctx.easeBy(vec(200, 0), 1000, EasingFunctions.EaseInOutCubic);
        ctx.delay(500);
        ctx.easeBy(vec(0, 200), 1000, EasingFunctions.EaseInOutCubic);
        ctx.delay(500);
        ctx.easeBy(vec(-200, 0), 1000, EasingFunctions.EaseInOutCubic);
        ctx.delay(500);
        ctx.easeBy(vec(0, -200), 1000, EasingFunctions.EaseInOutCubic);
        ctx.delay(500);
      });

      const rotateAroundBackAndForth = new ActionSequence(beepButton, (ctx) => {
        ctx.rotateBy(Math.PI, Math.PI, RotationType.Clockwise);
        ctx.delay(500);
        ctx.rotateBy(Math.PI, Math.PI, RotationType.CounterClockwise);
        ctx.delay(500);
        ctx.rotateBy(Math.PI, Math.PI, RotationType.Clockwise);
        ctx.delay(500);
        ctx.rotateBy(Math.PI, Math.PI, RotationType.CounterClockwise);
        ctx.delay(500);
      });

      const blink = new ActionSequence(boopButton, (ctx) => {
        // 6 seconds
        ctx.repeat((ctx2) => {
          ctx2.fade(0.2, 750);
          ctx2.fade(1, 750);
        }, 4);
      });

      const parallel = new ParallelActions([
        moveInBox,
        rotateAroundBackAndForth,
        blink,
      ]);

      beepButton.actions.repeatForever((ctx) => ctx.runAction(parallel));

      const moveInBox2 = new ActionSequence(boopButton, (ctx) => {
        ctx.easeBy(vec(-200, 0), 1000, EasingFunctions.EaseInOutCubic);
        ctx.delay(500);
        ctx.easeBy(vec(0, -200), 1000, EasingFunctions.EaseInOutCubic);
        ctx.delay(500);
        ctx.easeBy(vec(200, 0), 1000, EasingFunctions.EaseInOutCubic);
        ctx.delay(500);
        ctx.easeBy(vec(0, 200), 1000, EasingFunctions.EaseInOutCubic);
        ctx.delay(500);
      });

      const rotateAroundBackAndForth2 = new ActionSequence(
        boopButton,
        (ctx) => {
          ctx.rotateBy(Math.PI, Math.PI, RotationType.CounterClockwise);
          ctx.delay(500);
          ctx.rotateBy(Math.PI, Math.PI, RotationType.Clockwise);
          ctx.delay(500);
          ctx.rotateBy(Math.PI, Math.PI, RotationType.CounterClockwise);
          ctx.delay(500);
          ctx.rotateBy(Math.PI, Math.PI, RotationType.Clockwise);
          ctx.delay(500);
        }
      );

      const blink2 = new ActionSequence(beepButton, (ctx) => {
        // 6 seconds
        ctx.repeat((ctx2) => {
          ctx2.fade(0.2, 750);
          ctx2.fade(1, 750);
        }, 4);
      });

      const parallel2 = new ParallelActions([
        moveInBox2,
        rotateAroundBackAndForth2,
        blink2,
      ]);

      boopButton.actions.repeatForever((ctx) => ctx.runAction(parallel2));
    };

    this.youWin = () => {
      beepButton.actions.clearActions();
      boopButton.actions.clearActions();

      beepButton.actions.scaleBy(vec(10, 10), 100);
      beepButton.actions.fade(0, 3000);
      boopButton.actions.scaleBy(vec(10, 10), 100);
      boopButton.actions.fade(0, 3000);

      const youWinLabel = new Label({
        text: "You Win!",
        x: SCREEN_WIDTH / 2,
        y: SCREEN_HEIGHT / 2,
        font: new Font({
          family: "impact",
          size: 200,
          unit: FontUnit.Px,
          textAlign: TextAlign.Center,
          baseAlign: BaseAlign.Middle,
          color: WHITE,
        }),
        visible: true,
      });
      game.add(youWinLabel);
      currentLevelLabel.kill();
      currentSequenceLengthLabel.kill();
      correctLabel.kill();
      retryButton.kill();
      retryLabel.kill();
    };

    var emitter = new ParticleEmitter({
      x: 938,
      y: 380,
      width: 1837,
      height: 4723,
    });
    emitter.emitterType = EmitterType.Circle;
    emitter.radius = 810;
    emitter.minVel = 100;
    emitter.maxVel = 200;
    emitter.minAngle = 0;
    emitter.maxAngle = 6.2;
    emitter.isEmitting = true;
    emitter.emitRate = 167;
    emitter.opacity = 0.3;
    emitter.fadeFlag = true;
    emitter.particleLife = 3000;
    emitter.maxSize = 10;
    emitter.minSize = 1;
    emitter.startSize = 0;
    emitter.endSize = 0;
    emitter.acceleration = new Vector(-10, 10);
    emitter.beginColor = Color.Chartreuse;
    emitter.endColor = Color.Green;
    game.add(emitter);

    // First time puzzle
    generateNewPuzzle();
    playDesiredInput();
    this.startLevelZero();

    // UI (overlay comes last)
    game.add(currentLevelLabel);
    game.add(currentSequenceLengthLabel);
    game.add(correctLabel);
    refreshUI();
  }
}
