import * as PIXI from "pixi.js";
import { WIDTH, HIEGHT, app } from "../../../modules/App";
import Controls from "../../../modules/controls";
import Manager from "../../../modules/manager";
import { gsap } from "gsap";

type fontSize = "small" | "big" | "medium";

const fontSizes = {
  small: 40,
  medium: 80,
  big: 120,
};
export const FONT_FAMILY = "Architects Daughter";
export class TextPopin extends PIXI.Text {
  constructor(
    txt: string,
    shiftX: number,
    shiftY: number,
    fontSize: fontSize,
    containerOffset: number = 0,
    fontFamily: string = FONT_FAMILY
  ) {
    super(txt.toUpperCase(), {
      fontFamily,
      fontSize: fontSizes[fontSize],
      fontWeight: fontSize === "big" ? "bold" : "400",
      fill: 0xffffff,
      align: "center",
      dropShadow: true,
      dropShadowColor: 0x111,
      dropShadowBlur: 4,
      dropShadowDistance: 10,
      wordWrap: true,
      wordWrapWidth: WIDTH * 0.8,
    });
    // this.blendMode = PIXI.BLEND_MODES.ADD;
    this.anchor.set(0.5);
    this.alpha = 0;
    this.position.x = shiftX;
    let globalX = shiftX + containerOffset;

    this.position.y = shiftY;
    this.position.y += 200;
    let appeared = false;
    app.ticker.add((dt) => {
      const moveDt = Controls.move * dt * Manager.moveSpeed;
      this.position.x -= moveDt;
      globalX -= moveDt;
      if (!appeared && globalX - WIDTH * 0.65 < 0) {
        const duration = 1.5;
        gsap.to(this.position, {
          y: this.position.y - 200,
          duration,
          ease: "elastic",
        });
        gsap.to(this, { alpha: 1, duration, ease: "elastic" });
        appeared = true;
      }
    });
  }
}
