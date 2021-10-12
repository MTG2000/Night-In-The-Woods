import { loader } from "../../../modules/loader";
import { BloomFilter } from "@pixi/filter-bloom";
import * as PIXI from "pixi.js";
import { getAnimationUrls, setupObject } from "../../../utils/helperFunctions";
import { HIEGHT } from "../../../modules/App";

export default class Ghost2 {
  static preload() {
    loader.add("ghost_2", "assets/characters/dhh/Violin/spritesheet.json");
  }

  static create(resources: any, offsetX: number) {
    let obj = new PIXI.AnimatedSprite(
      getAnimationUrls(
        "Astral_Violin_Loop_1_",
        resources.ghost_2.textures,
        30,
        1
      )
    );
    obj = setupObject(obj, {
      scale: 0.4,
      offsetX: offsetX,
      offsetY: 80,
      animationSpeed: 0.5,
    }) as PIXI.AnimatedSprite;
    obj.scale.x *= -1;
    return obj;
  }
}
