import * as PIXI from "pixi.js";
import { app, WIDTH, HIEGHT } from "../../modules/App";
import Controls from "../../modules/controls";
import Manager from "../../modules/manager";
import gsap from "gsap";

export default class Mist extends PIXI.Container {
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

    const needsParrallax = offsetEnd - offsetStart >= WIDTH * 3;

    this.prevSprite = new PIXI.Sprite(texture);
    this.curSprite = new PIXI.Sprite(texture);
    this.nxtSprite = new PIXI.Sprite(texture);
    this.prevSprite.blendMode = PIXI.BLEND_MODES.LIGHTEN;
    this.curSprite.blendMode = PIXI.BLEND_MODES.LIGHTEN;
    this.nxtSprite.blendMode = PIXI.BLEND_MODES.LIGHTEN;
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
    const isPlayerTotallyInside = (x: number) =>
      x > offsetStart + containerOffset + WIDTH &&
      x < offsetEnd + containerOffset - WIDTH;

    this.alpha = 0;
    const threshold = 100;

    let hidden = true;

    app.ticker.add((dt) => {
      const moveDelta =
        Controls.move * dt * Manager.moveSpeed * this.speedFactor;
      this.prevSprite.position.x -= moveDelta;
      this.curSprite.position.x -= moveDelta;
      this.nxtSprite.position.x -= moveDelta;

      if (!needsParrallax) return;

      if (hidden && isPlayerTotallyInside(Manager.playerX))
        gsap.to(this, {
          alpha: 1,
          duration: 4,
          ease: "linear",
          onComplete: () => {
            hidden = false;
          },
        });
      if (!hidden && !isPlayerTotallyInside(Manager.playerX)) {
        console.log(offsetEnd);

        gsap.to(this, {
          alpha: 0,
          duration: 1,
          ease: "easeIn",

          onComplete: () => {
            hidden = true;
          },
        });
      }

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
