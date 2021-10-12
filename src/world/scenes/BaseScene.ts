import Layer from "../layer";
import Manager from "../../modules/manager";
import * as PIXI from "pixi.js";

export default class BaseScene {
  layers: Layer[] = [];
  speed = 0;
  backContainer = new PIXI.Container();
  middleContainer = new PIXI.Container();
  textContainer = new PIXI.Container();
  frontContainer = new PIXI.Container();
  offset: number;
  constructor(offset: number) {
    this.speed = Manager.moveSpeed;
    this.preload();
    this.backContainer.position.x = offset;
    this.middleContainer.position.x = offset;
    this.textContainer.position.x = offset;
    this.frontContainer.position.x = offset;
    this.offset = offset;
  }

  preload() {}

  init(resources: any) {}
}
