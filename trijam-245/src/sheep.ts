import {
  Actor,
  CollisionType,
  Color,
  Engine,
  GraphicsGroup,
  Keys,
  Scene,
  vec,
} from "excalibur";
import { FENCE_WIDTH, FENCE_X, FINISH_LINE_WIDTH } from "./config";
import { gameState, incrementSheepCounted } from "./gameState";
import { Sounds, spriteSheet } from "./loader";
import { refreshUI } from "./ui";

const WALK_VEL = vec(100, 0);

export enum SheepVariety {
  White,
  Black,
}

export class Sheep extends Actor {
  isJumping: boolean = true; // assume doesn't start on floor
  didCrossFinishLine: boolean = false;
  walkDirection: number = 1;
  variety: SheepVariety = SheepVariety.White;

  constructor(props: { x: number; y: number; variety: SheepVariety }) {
    const { x, y, variety } = props;
    super({
      x,
      y,
      width: 48,
      height: 48,
      collisionType: CollisionType.Active,
    });
    this.variety = variety;
    this.addTag("sheep");
  }

  public onInitialize(_engine: Engine) {
    const sprite = spriteSheet.sprites[5].clone();

    sprite.tint =
      this.variety === SheepVariety.Black ? Color.Black : Color.White;

    this.vel = WALK_VEL;

    const group = new GraphicsGroup({
      members: [
        {
          graphic: sprite,
          pos: vec(0, 0),
        },
      ],
    });

    this.graphics.use(group);

    this.on("collisionstart", (event) => {
      if (this.didCrossFinishLine) return;

      // if on top of the fence, don't change direction
      if (event.other.hasTag("fence") && event.contact.normal.y < 0) {
        return;
      }

      if (
        // landed on floor
        event.other.hasTag(
          "floor" ||
            // landed on another sheep
            (event.other.hasTag("sheep") && event.contact.normal.y < 0)
        )
      ) {
        this.isJumping = false;
        return;
      }

      // change x direction
      this.walkDirection *= -1;

      // TODO: better collide
      //   Sounds.select.play(0.05);
    });

    gameState.activeSheep += 1;
  }

  onPreKill(_scene: Scene<unknown>): void {
    gameState.activeSheep -= 1;
  }

  private hasCrossedFence() {
    return this.pos.x >= FENCE_X + FENCE_WIDTH / 2;
  }
  private jump() {
    if (!this.isJumping && !this.hasCrossedFence()) {
      if (this.variety === SheepVariety.Black) {
        this.vel.y = -550; // big jump for funz
      } else {
        this.vel.y = -400;
      }
      this.vel.x *= 1.1;

      this.isJumping = true;
      Sounds.jump.play(0.1);
    }
  }

  onPreUpdate(engine: Engine, _delta: number): void {
    if (this.didCrossFinishLine) {
      // done!
      return;
    }

    // this means you slide UP the fence.. a bit odd but makes game much easier!
    // it was also added b/c sometimes sheep got stuck and stopped walking.
    this.vel.x = WALK_VEL.x * this.walkDirection;

    // TODO: change this to a collision with an invis hitbox
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
    }

    // show whether it's jumping.. indicate if it can jump again
    this.graphics.flipVertical = this.isJumping;

    // point sheep in correct direction
    this.graphics.flipHorizontal = this.vel.x >= 0;
  }
}
