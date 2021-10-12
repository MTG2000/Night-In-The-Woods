import * as PIXI from "pixi.js";
import World from "../world/world";
import { app } from "../modules/App";
import Controls from "../modules/controls";
import Manager from "../modules/manager";

export function getAnimationUrls(
  base: string,
  texturesObj: { [key: string]: PIXI.Texture<PIXI.Resource> },
  framesNumber: number,
  firstFrame = 1
) {
  return Array(framesNumber)
    .fill(0)
    .map((_, idx) => {
      return texturesObj[`${base}${idx + firstFrame}.png`];
    });
}

interface IOptions {
  offsetX: number;
  offsetY?: number;
  scale: number;
  animationSpeed?: number;
}

export function setupObject(
  sprite: PIXI.AnimatedSprite | PIXI.Sprite,
  { scale, offsetX, offsetY = 0, animationSpeed = 1 }: IOptions
) {
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  sprite.scale.set(scale);
  sprite.x = offsetX;
  sprite.y = World.groundLine + offsetY;

  if (sprite instanceof PIXI.AnimatedSprite) {
    sprite.play();
    sprite.animationSpeed = animationSpeed;
  }
  app.ticker.add((dt) => {
    sprite.x -= Controls.move * dt * Manager.moveSpeed;
  });

  return sprite;
}

export function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
