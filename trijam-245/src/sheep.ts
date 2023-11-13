import {
  Actor,
  CollisionType,
  Color,
  Engine,
  GraphicsGroup,
  Keys,
  Rectangle,
  Timer,
  vec,
} from "excalibur";
import { FINISH_LINE_WIDTH, FLOOR_HEIGHT } from "./config";
import { spriteSheet } from "./loader";

const WALK_VEL = vec(50, 0);

export class Sheep extends Actor {
  jumpTimer?: Timer;
  didCrossFinishLine: boolean = false;
  walkDirection: number = 1;

  constructor(props: { x: number; y: number }) {
    const { x, y } = props;
    super({ x, y, width: 48, height: 48, collisionType: CollisionType.Active });
  }

  public onInitialize(_engine: Engine) {
    const sprite = spriteSheet.sprites[0];

    this.vel = WALK_VEL;

    // display the collide
    const rect = new Rectangle({
      width: this.width,
      height: this.height,
      color: Color.Green,
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
      if (event.other.hasTag("fence") && this.pos.y === 416) {
        // don't change direct
        return;
      }

      // change x direction
      this.walkDirection *= -1;
      this.vel.x = WALK_VEL.x * this.walkDirection;
    });
  }

  private jump() {
    // if is on ground
    if (this.pos.y === FLOOR_HEIGHT) {
      this.vel.y = -300;

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
      this.vel = vec(0, 0);
      this.didCrossFinishLine = true;
      return;
    }

    if (engine.input.keyboard.wasPressed(Keys.Space)) {
      this.jump();
    }
  }

  onPostUpdate(engine: Engine, _delta: number): void {
    if (this.didCrossFinishLine) {
      // done!
      return;
    }

    if (this.pos.x >= FINISH_LINE_WIDTH) {
      this.vel = vec(0, 0);
      this.didCrossFinishLine = true;
      return;
    }

    if (engine.input.keyboard.wasPressed(Keys.Space)) {
      this.jump();
    }
  }
}
