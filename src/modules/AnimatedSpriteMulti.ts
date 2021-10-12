import * as PIXI from "pixi.js";

export class AnimatedSpriteMulti extends PIXI.AnimatedSprite {
  animations: {
    [key: string]: { textures: PIXI.Texture<PIXI.Resource>[]; speed: number };
  } = {};

  constructor(textures: PIXI.Texture<PIXI.Resource>[] | PIXI.FrameObject[]) {
    super(textures);
  }

  addAnimation(
    name: string,
    textures: PIXI.Texture<PIXI.Resource>[],
    speed: number
  ) {
    this.animations[name] = { textures, speed };
  }

  setAnimation(name: string, onComplete = () => {}) {
    if (!this.animations[name]) return;
    this.stop();
    this.textures = this.animations[name].textures;
    this.animationSpeed = this.animations[name].speed;
    this.loop = true;
    this.play();
    // this.onComplete = onComplete;
  }
}
