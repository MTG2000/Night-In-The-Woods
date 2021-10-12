import { loader } from "../../../modules/loader";
import { BloomFilter } from "@pixi/filter-bloom";
import * as PIXI from "pixi.js";
import { getAnimationUrls, setupObject } from "../../../utils/helperFunctions";
import { HIEGHT } from "../../../modules/App";

export default class Bea {
  static preload() {
    loader.add("bea", "assets/characters/bea_santello/spritesheet.json");
  }

  static create(resources: any, offsetX: number) {
    let obj = new PIXI.AnimatedSprite(
      getAnimationUrls(
        "Bea_Dance_Dance_LoopOne_",
        resources.bea.textures,
        40,
        38
      )
    );
    obj = setupObject(obj, {
      scale: 0.4,
      offsetX: offsetX,
      offsetY: 80,
      animationSpeed: 0.5,
    }) as PIXI.AnimatedSprite;

    return obj;
  }
}
