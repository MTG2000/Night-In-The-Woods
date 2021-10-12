import Layer from "../layer";
import { loader } from "../../modules/loader";
import BaseScene from "./BaseScene";
import * as PIXI from "pixi.js";
import { app, WIDTH, HIEGHT } from "../../modules/App";
import FallingLeaves from "./FallingLeaves";
import Button from "../../UI/Button";
import { TextPopin } from "./objects/TextPopin";
export default class Forest2 extends BaseScene {
  leavesContainer: PIXI.Container;

  constructor(args: number) {
    super(args);
    this.leavesContainer = new PIXI.Container();
  }

  preload() {
    loader.add(`leaf`, `assets/level/forest/leaf.png`);
  }

  init(resources: any) {
    this.textContainer.addChild(
      new FallingLeaves(resources.leaf.texture, 0, 5 * WIDTH, this.offset)
    );

    this.textContainer.addChild(
      new TextPopin(
        "Welcome To",
        WIDTH / 2,
        HIEGHT / 4 + 80,
        "small",
        this.offset
      )
    );
    this.textContainer.addChild(
      new TextPopin(
        "Night In The Woods",
        WIDTH / 2,
        HIEGHT / 2,
        "big",
        this.offset
      )
    );
    this.textContainer.addChild(
      new TextPopin(
        "A Story about growing, adulthood, and mental problems",
        WIDTH + WIDTH / 2,
        HIEGHT / 2,
        "small",
        this.offset
      )
    );
    // this.frontContainer.addChild(
    //   new Layer(resources.trees_front.texture, 1, {
    //     offsetStart: WIDTH,
    //     containerOffset: this.offset,
    //   })
    // );
  }
}
