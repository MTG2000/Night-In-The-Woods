import * as PIXI from "pixi.js";
import { app, WIDTH, HIEGHT } from "../modules/App";
import Controls from "../modules/controls";
import Manager from "../modules/manager";

export default class Layer extends PIXI.Container {
  speedFactor = 1;
  prevSprite: PIXI.Sprite;
  curSprite: PIXI.Sprite;
  nxtSprite: PIXI.Sprite;
  constructor(
    texture: PIXI.Texture<PIXI.Resource>,
    speedFactor: number,
    {
      offsetStart = -Infinity,
      offsetEnd = Infinity,
      shiftY = 0,
      containerOffset = 0,
    }: {
      offsetStart?: number;
      offsetEnd?: number;
      shiftY?: number;
      containerOffset?: number;
    } = {}
  ) {
    super();
    offsetStart *= speedFactor;
    offsetEnd *= speedFactor;
    const needsParrallax = offsetEnd - offsetStart >= WIDTH * 3;

    this.prevSprite = new PIXI.Sprite(texture);
    this.curSprite = new PIXI.Sprite(texture);
    this.nxtSprite = new PIXI.Sprite(texture);
    this.prevSprite.width = this.curSprite.width = this.nxtSprite.width = WIDTH;
    this.prevSprite.height = this.curSprite.height = this.nxtSprite.height = HIEGHT;
    this.speedFactor = speedFactor;

    if (offsetStart === -Infinity) {
      this.prevSprite.x = -WIDTH;
      this.curSprite.x = 0;
      this.nxtSprite.x = +WIDTH;
    } else {
      this.prevSprite.x = offsetStart;
      this.curSprite.x = offsetStart + WIDTH;
      if (this.curSprite.x >= offsetEnd) this.curSprite.visible = false;
      this.nxtSprite.x = offsetStart + 2 * WIDTH;
      if (this.nxtSprite.x >= offsetEnd) this.nxtSprite.visible = false;
    }

    const threshold = 100;
    app.ticker.add((dt) => {
      const moveDelta =
        Controls.move * dt * Manager.moveSpeed * this.speedFactor;
      this.prevSprite.position.x -= moveDelta;
      this.curSprite.position.x -= moveDelta;
      this.nxtSprite.position.x -= moveDelta;

      if (!needsParrallax) return;
      if (
        WIDTH / 2 > this.nxtSprite.position.x + containerOffset + threshold &&
        Manager.playerX * speedFactor + WIDTH < offsetEnd + containerOffset
      ) {
        const tmpCur = this.curSprite;
        this.curSprite = this.nxtSprite;
        this.nxtSprite = this.prevSprite;
        this.prevSprite = tmpCur;

        this.nxtSprite.position.x = this.curSprite.position.x + WIDTH;
      } else if (
        WIDTH / 2 < this.curSprite.position.x + containerOffset - threshold &&
        Manager.playerX * speedFactor - WIDTH > offsetStart + containerOffset
      ) {
        const tmpCur = this.curSprite;
        this.curSprite = this.prevSprite;
        this.prevSprite = this.nxtSprite;
        this.nxtSprite = tmpCur;

        this.prevSprite.position.x = this.curSprite.position.x - WIDTH;
      }
    });
    this.addChild(this.prevSprite, this.curSprite, this.nxtSprite);
    this.position.y += shiftY;
  }

  init(texture: PIXI.Texture<PIXI.Resource>, speed: number) {}
}
