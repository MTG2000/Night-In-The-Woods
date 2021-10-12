import * as PIXI from "pixi.js";
import { app, WIDTH, HIEGHT } from "../../modules/App";
import Controls from "../../modules/controls";
import Manager from "../../modules/manager";
import { loader } from "../../modules/loader";
import { random } from "../../utils/helperFunctions";
import Player from "../../modules/player";

export default class FallingLeaves extends PIXI.Container {
  density = 1;
  constructor(
    texture: PIXI.Texture<PIXI.Resource>,
    offsetStart: number,
    offsetEnd: number,
    containerOffset: number = 0,
    density: number = 40
  ) {
    super();
    this.density = density;
    this.position.x = offsetStart;
    const containerWidth = 2 * WIDTH;

    const isPlayerTotallyInside = (x: number) =>
      x > offsetStart + containerOffset + WIDTH / 2 &&
      x < offsetEnd + containerOffset - WIDTH / 2;

    app.ticker.add((dt) => {
      if (isPlayerTotallyInside(Manager.playerX)) {
        this.position.x = -containerOffset;
      } else {
        const moveDelta = Controls.move * dt * Manager.moveSpeed;
        this.position.x -= moveDelta;
      }
    });

    // const graphics = new PIXI.Graphics();
    // graphics.lineStyle(2, 0x25130c, 0.1);
    // graphics.beginFill(0x25130c, 1);
    // graphics.drawRect(0, 10, WIDTH, 44);
    // this.addChild(graphics);

    const tints = [
      0xa52a2a,
      0xff9800,
      0xffc107,
      0xffff00,
      0xff9800,
      0xffc107,
      0xffff00,
    ];

    const leafs = Array(this.density)
      .fill(undefined)
      .map((a) => {
        const randX = Math.random();
        const randY = Math.random();

        const leaf = new PIXI.Sprite(texture);
        leaf.scale.set(random(0.2, 0.35));
        leaf.rotation += random((5 * Math.PI) / 180, (65 * Math.PI) / 180);
        this.addChild(leaf);
        leaf.position.set(randX * containerWidth, randY * HIEGHT);
        leaf.tint = tints[Math.floor(random(0, tints.length))];
        const fallSpeed = random(2, 3);
        app.ticker.add((dt) => {
          if (
            Manager.playerX + (WIDTH * 3) / 2 < offsetStart + containerOffset ||
            Manager.playerX - (WIDTH * 3) / 2 > offsetEnd + containerOffset
          )
            return;
          const negativePlayerMove = Controls.move * Manager.moveSpeed * dt;
          const negativeContainerMove = isPlayerTotallyInside(Manager.playerX)
            ? 0
            : -negativePlayerMove;
          leaf.position.x -=
            dt * fallSpeed + negativePlayerMove + negativeContainerMove;
          leaf.position.y += dt * fallSpeed;

          if (leaf.position.y > HIEGHT) {
            leaf.position.x = random(0, containerWidth);
            leaf.position.y = -leaf.height;
          }
        });
        return leaf;
      });
  }
}
