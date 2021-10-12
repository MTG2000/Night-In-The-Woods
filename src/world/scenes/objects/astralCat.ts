import { loader } from "../../../modules/loader";
import { BloomFilter } from "@pixi/filter-bloom";
import * as PIXI from "pixi.js";
import { getAnimationUrls, setupObject } from "../../../utils/helperFunctions";
import { HIEGHT, app, WIDTH } from "../../../modules/App";
import Controls from "../../../modules/controls";
import Manager from "../../../modules/manager";
import gsap from "gsap";

export default class AstralCat {
  static sprite: PIXI.Sprite | undefined;

  static preload() {
    loader.add("cat", "assets/characters/cat/cat.png");
  }

  static create(resources: any, offsetX: number) {
    const sprite = new PIXI.Sprite(resources.cat.texture);

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.scale.x *= -1;
    // sprite.scale.set(1);
    sprite.x = WIDTH + sprite.width / 2;
    sprite.y = HIEGHT / 2;
    // app.ticker.add((dt) => {
    //   sprite.x -= Controls.move * dt * Manager.moveSpeed * 0.7;
    // });
    this.sprite = sprite;
    return sprite;
  }
}
