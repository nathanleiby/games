import {
  Actor,
  BaseAlign,
  CollisionType,
  Color,
  EmitterType,
  Engine,
  Font,
  FontUnit,
  Label,
  ParticleEmitter,
  Scene,
  TextAlign,
  Vector,
  vec,
} from "excalibur";
import { BeepButton } from "./BeepButton";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./config";
import "./style.css";

const BOOP_START_x = SCREEN_WIDTH / 2 + 128;
const BEEP_START_x = SCREEN_WIDTH / 2 - 128;
const BUTTON_START_Y = SCREEN_HEIGHT / 2;

const WHITE = Color.fromRGB(255, 255, 255);

export class LandingScreen extends Scene {
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

    // Beep
    const beepButton = new BeepButton({
      x: BEEP_START_x,
      y: BUTTON_START_Y,
      color: Color.fromRGB(255, 0, 0),
      handler: () => {},
    });
    game.add(beepButton);

    // Boop
    const boopButton = new BeepButton({
      x: BOOP_START_x,
      y: BUTTON_START_Y,
      color: Color.fromRGB(0, 0, 255),
      handler: () => {},
    });
    game.add(boopButton);

    beepButton.actions.clearActions();
    boopButton.actions.clearActions();

    beepButton.actions.scaleBy(vec(2, 2), 100);
    beepButton.actions.fade(0.5, 3000);
    boopButton.actions.scaleBy(vec(2, 2), 100);
    boopButton.actions.fade(0.5, 3000);

    const titleLabel = new Label({
      text: "Beep Boop Bop",
      x: SCREEN_WIDTH / 2,
      y: SCREEN_HEIGHT / 2,
      font: new Font({
        family: "impact",
        size: 120,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
        baseAlign: BaseAlign.Middle,
        color: WHITE,
      }),
      visible: true,
    });
    game.add(titleLabel);

    const retryButton = new Actor({
      x: SCREEN_WIDTH / 2,
      y: SCREEN_HEIGHT - 128,
      radius: 40,
      color: WHITE,
    });
    game.add(retryButton);
    const retryLabel = new Label({
      text: "Start",
      x: SCREEN_WIDTH / 2,
      y: SCREEN_HEIGHT - 128,
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
    retryButton.on("pointerdown", () => {
      game.goToScene("level");
    });

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
  }
}
