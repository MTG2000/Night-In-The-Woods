import { loader } from "../../../modules/loader";
import { BloomFilter } from "@pixi/filter-bloom";
import * as PIXI from "pixi.js";
import { getAnimationUrls, setupObject } from "../../../utils/helperFunctions";

export default class BumpkinHead {
  static preload() {
    loader.add(
      "pumpkin_head",
      "assets/characters/pumpkin_head_guy/spritesheet.json"
    );
  }

  static create(resources: any, offsetX: number) {
    let obj = new PIXI.AnimatedSprite(
      getAnimationUrls("0", resources.pumpkin_head.textures, 5)
    );
    obj = setupObject(obj, {
      scale: 0.4,
      offsetX: offsetX,
      offsetY: -50,
      animationSpeed: 0.15,
    }) as PIXI.AnimatedSprite;

    obj.scale.x *= -1;

    return obj;
  }
}
