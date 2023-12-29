import { Actor } from "excalibur";

export class Background extends Actor {

    // constructor(props: { x: number; y: number; variety: SheepVariety }) {
    //   const { x, y, variety } = props;
    //   super({ x, y, width: 48, height: 48, collisionType: CollisionType.Active });
    //   this.variety = variety;
    // }
}

// export class Background extends Actor {
//   constructor: (x, y) => {
//     ex.Actor.apply(this, [x, y]);
//     this.width = 500;
//     this.height = 500;
//     this.dx = ex.Util.randomInRange(-30, -100);
//     var cloud = Resource.Cloud.asSprite();
//     cloud.setScaleX(3 * gameScale.x);
//     cloud.setScaleY(3 * gameScale.y);

//     this.addDrawing("default", cloud);
//     this.setCenterDrawing(true);
//     this.scale.setTo(gameScale.x, gameScale.y);
//   },

//   update: function (engine, delta) {
//     ex.Actor.prototype.update.apply(this, [engine, delta]);
//     var screenCoords = engine.worldToScreenCoordinates(
//       new ex.Point(this.x, this.y)
//     );

//     if (screenCoords.x + this.getWidth() < 0) {
//       this.x = engine.width + this.getWidth();
//     }
//   },
}
