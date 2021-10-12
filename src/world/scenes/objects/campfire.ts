import { loader } from "../../../modules/loader";
import { BloomFilter } from "@pixi/filter-bloom";
import * as PIXI from "pixi.js";
import { getAnimationUrls, setupObject } from "../../../utils/helperFunctions";
import World from "../../world";
import { HIEGHT } from "../../../modules/App";

export default class Campfire {
  static preload() {
    loader.add("campfire", "assets/level/campfire/spritesheet.json");
  }

  static create(resources: any, offsetX: number) {
    let obj = new PIXI.AnimatedSprite(
      getAnimationUrls("fire-", resources.campfire.textures, 6)
    );
    obj = setupObject(obj, {
      scale: 0.55,
      offsetX: offsetX,
      offsetY: -120,
      animationSpeed: 0.15,
    }) as PIXI.AnimatedSprite;

    obj.filters = [new BloomFilter(8)];
    return obj;
  }
}
