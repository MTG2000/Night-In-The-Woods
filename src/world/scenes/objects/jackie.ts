import { loader } from "../../../modules/loader";
import { BloomFilter } from "@pixi/filter-bloom";
import * as PIXI from "pixi.js";
import { getAnimationUrls, setupObject } from "../../../utils/helperFunctions";

export default class Jackie {
  static preload() {
    loader.add("jackie", "assets/characters/jackie/spritesheet.json");
  }

  static create(resources: any, offsetX: number) {
    let obj = new PIXI.AnimatedSprite(
      getAnimationUrls("jackie_dance_loop_", resources.jackie.textures, 24, 12)
    );
    obj = setupObject(obj, {
      scale: 0.4,
      offsetX: offsetX,
      offsetY: 25,
      animationSpeed: 0.5,
    }) as PIXI.AnimatedSprite;

    obj.scale.x *= -1;

    return obj;
  }
}
