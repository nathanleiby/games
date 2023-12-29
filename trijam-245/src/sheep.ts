import {
  Actor,
  CollisionType,
  Color,
  Engine,
  GraphicsGroup,
  Keys,
  Rectangle,
  Scene,
  Timer,
  vec,
} from "excalibur";
import { FINISH_LINE_WIDTH, FLOOR_HEIGHT } from "./config";
import { gameState, incrementSheepCounted } from "./gameState";
import { Sounds, spriteSheet } from "./loader";
import { refreshUI } from "./ui";

const WALK_VEL = vec(50, 0);

export enum SheepVariety {
  White,
  Black,
}

export class Sheep extends Actor {
  jumpTimer?: Timer;
  isJumping: boolean = false;
  didCrossFinishLine: boolean = false;
  walkDirection: number = 1;
  variety: SheepVariety = SheepVariety.White;

  constructor(props: { x: number; y: number; variety: SheepVariety }) {
    const { x, y, variety } = props;
    super({ x, y, width: 48, height: 48, collisionType: CollisionType.Active });
    this.variety = variety;
  }

  public onInitialize(_engine: Engine) {
    const sprite = spriteSheet.sprites[5]; // left facing

    this.vel = WALK_VEL;

    // display the collide
    const rect = new Rectangle({
      width: this.width,
      height: this.height,
      color: this.variety === SheepVariety.Black ? Color.Black : Color.White,
    });
    const group = new GraphicsGroup({
      members: [
        {
          graphic: rect,
          pos: vec(40, 40),
        },
        {
          graphic: sprite,
          pos: vec(0, 0),
        },
      ],
    });

    this.graphics.use(group);

    this.jumpTimer = new Timer({
      interval: 10,
      fcn: () => {
        this.vel.y += 5;
        if (this.pos.y >= FLOOR_HEIGHT) {
          this.pos.y = FLOOR_HEIGHT;
          this.vel.y = 0;
          this.isJumping = false;
          this.jumpTimer?.stop();
          return;
        }
      },
      repeats: true,
    });

    _engine.add(this.jumpTimer);

    this.on("collisionstart", (event) => {
      if (this.didCrossFinishLine) return;

      // if on top of the fence, don't change direction
      if (event.other.hasTag("fence") && this.pos.y <= 416) {
        return;
      }

      // change x direction
      this.walkDirection *= -1;
      this.vel.x = WALK_VEL.x * this.walkDirection;

      // TODO: better collide
      //   Sounds.select.play(0.05);
    });

    gameState.activeSheep += 1;
  }

  onPreKill(_scene: Scene<unknown>): void {
    gameState.activeSheep -= 1;
  }

  private jump() {
    // if is on ground
    if (this.pos.y >= FLOOR_HEIGHT && !this.isJumping) {
      if (this.variety === SheepVariety.Black) {
        this.vel.y = -500; // big jump for funz
      } else {
        this.vel.y = -350;
      }
      this.vel.x *= 1.1;

      this.isJumping = true;
      this.jumpTimer?.start();
    }

    // jump
  }

  onPreUpdate(engine: Engine, _delta: number): void {
    if (this.didCrossFinishLine) {
      // done!
      return;
    }

    if (this.pos.x >= FINISH_LINE_WIDTH) {
      this.didCrossFinishLine = true;
      incrementSheepCounted();
      Sounds.coin.play(0.2);
      refreshUI();
      this.actions.fade(0, 500).die();
      return;
    }

    if (engine.input.keyboard.wasPressed(Keys.Space)) {
      this.jump();
      Sounds.jump.play(0.1);
    }

    // point sheep in correct direction
    this.graphics.flipHorizontal = this.vel.x >= 0;
  }
}
