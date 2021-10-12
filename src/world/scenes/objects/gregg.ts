import { loader } from "../../../modules/loader";
import { BloomFilter } from "@pixi/filter-bloom";
import * as PIXI from "pixi.js";
import { getAnimationUrls, setupObject } from "../../../utils/helperFunctions";

export default class Gregg {
  static preload() {
    loader.add(
      "greggory_lee",
      "assets/characters/greggory_lee/spritesheet.json"
    );
  }

  static create(resources: any, offsetX: number) {
    let obj = new PIXI.AnimatedSprite(
      getAnimationUrls("", resources.greggory_lee.textures, 14, 2)
    );
    obj = setupObject(obj, {
      scale: 0.6,
      offsetX: offsetX,
      offsetY: 200,
      animationSpeed: 0.4,
    }) as PIXI.AnimatedSprite;

    obj.scale.x *= -1;

    return obj;
  }
}
