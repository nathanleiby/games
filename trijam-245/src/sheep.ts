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
import { FLOOR_HEIGHT } from "./config";
import { spriteSheet } from "./loader";

export class Sheep extends Actor {
  jumpTimer?: Timer;

  constructor(props: { x: number; y: number }) {
    const { x, y } = props;
    super({ x, y, width: 48, height: 48, collisionType: CollisionType.Active });
  }

  public onInitialize(_engine: Engine) {
    const sprite = spriteSheet.sprites[0];

    this.vel = vec(50, 0);

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
        console.log("fcn");
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
    if (engine.input.keyboard.wasPressed(Keys.Space)) {
      this.jump();
    }
  }
}
