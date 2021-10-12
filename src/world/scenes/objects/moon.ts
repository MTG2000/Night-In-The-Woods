import { loader } from "../../../modules/loader";
import { BloomFilter } from "@pixi/filter-bloom";
import * as PIXI from "pixi.js";
import { getAnimationUrls, setupObject } from "../../../utils/helperFunctions";
import { HIEGHT, app } from "../../../modules/App";
import Controls from "../../../modules/controls";
import Manager from "../../../modules/manager";

export default class Moon {
  static preload() {
    loader.add("moon", "assets/level/forest/moon.png");
  }

  static create(resources: any, offsetX: number) {
    const sprite = new PIXI.Sprite(resources.moon.texture);

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0;
    sprite.scale.set(1);
    sprite.x = offsetX;
    sprite.y = 250;
    app.ticker.add((dt) => {
      sprite.x -= Controls.move * dt * Manager.moveSpeed * 0.7;
    });
    sprite.filters = [new BloomFilter(11)];
    return sprite;
  }
}
