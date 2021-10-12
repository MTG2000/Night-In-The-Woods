import { loader } from "../../../modules/loader";
import { BloomFilter } from "@pixi/filter-bloom";
import * as PIXI from "pixi.js";
import { getAnimationUrls, setupObject } from "../../../utils/helperFunctions";
import World from "../../world";
import { app } from "../../../modules/App";
import Controls from "../../../modules/controls";
import Manager from "../../../modules/manager";

export default class GuitarPlayer {
  static preload() {
    loader.add(
      "guitar_player",
      "assets/characters/douchebag_guitar_player/spritesheet.json"
    );
  }

  static create(resources: any, offsetX: number) {
    let sprite = new PIXI.AnimatedSprite(
      getAnimationUrls("Douchebag_Play_", resources.guitar_player.textures, 48)
    );

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.scale.set(0.4);
    sprite.x = 0;
    sprite.y = World.groundLine + 0;
    sprite.play();
    sprite.animationSpeed = 0.5;

    const graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0x25130c, 0.1);
    graphics.beginFill(0x25130c, 1);
    graphics.drawRect(-85, World.groundLine + 50, 172, 44);

    const obj = new PIXI.Container();
    obj.position.x = offsetX;
    obj.addChild(graphics);

    obj.addChild(sprite);

    app.ticker.add((dt) => {
      obj.x -= Controls.move * dt * Manager.moveSpeed;
    });

    return obj;
  }
}
