import { loader } from "../../../modules/loader";
import { BloomFilter } from "@pixi/filter-bloom";
import * as PIXI from "pixi.js";
import { getAnimationUrls, setupObject } from "../../../utils/helperFunctions";
import { HIEGHT, app, WIDTH } from "../../../modules/App";
import Controls from "../../../modules/controls";
import Manager from "../../../modules/manager";
import gsap from "gsap";
import World from "../../world";

export default class Cultist {
  static preload() {
    loader.add("cult_leader", "assets/characters/cult/lead.png");
    loader.add("cult_member", "assets/characters/cult/member.png");
  }

  static create(resources: any, offsetX: number, containerOffset: number) {
    const sprite = new PIXI.Sprite(resources.cult_leader.texture);

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.scale.set(0.45);
    sprite.x = offsetX;
    sprite.y = World.groundLine + 110;

    app.ticker.add((dt) => {
      sprite.x -= Controls.move * dt * Manager.moveSpeed;
      if (sprite.x + containerOffset < WIDTH * 0.65) {
        gsap.to(sprite, {
          alpha: 0,
        });
      }
    });
    return sprite;
  }

  static createMember(
    resources: any,
    offsetX: number,
    upOrDown: "up" | "down",
    containerOffset: number
  ) {
    const sprite = new PIXI.Sprite(resources.cult_member.texture);

    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.scale.set(upOrDown === "up" ? 0.6 : 1);
    sprite.x = offsetX;
    if (upOrDown === "up") sprite.y = World.groundLine;
    else sprite.y = HIEGHT - 50;

    app.ticker.add((dt: number) => {
      sprite.x -= Controls.move * dt * Manager.moveSpeed;
      if (sprite.x + containerOffset < WIDTH / 3) {
        gsap.to(sprite, {
          alpha: 0,
        });
      }
    });
    return sprite;
  }
}
