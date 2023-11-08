import Layer from "../layer";
import { loader } from "../../modules/loader";
import BaseScene from "./BaseScene";
import * as PIXI from "pixi.js";
import { app, WIDTH, HIEGHT } from "../../modules/App";
import FallingLeaves from "./FallingLeaves";
import Button from "../../UI/Button";
import { TextPopin } from "./objects/TextPopin";
import Ghost1 from "./objects/ghost1";
import Ghost2 from "./objects/ghost2";
import Cultist from "./objects/cultist";
import Mist from "./Mist";
export default class Forest3 extends BaseScene {
  constructor(args: number) {
    super(args);
  }

  preload() {
    Ghost1.preload();
    Ghost2.preload();
    Cultist.preload();
  }

  init(resources: any) {
    this.middleContainer.addChild(
      Ghost1.create(resources, WIDTH + WIDTH / 2 - 200)
    );
    this.middleContainer.addChild(
      Ghost2.create(resources, WIDTH + WIDTH / 2 + 200)
    );

    this.textContainer.addChild(
      new TextPopin(
        "Some strage things are happening in the woods...",
        WIDTH + WIDTH / 2,
        HIEGHT / 2,
        "medium",
        this.offset
      )
    );
    this.middleContainer.addChild(
      Cultist.createMember(resources, 4 * WIDTH + 250, "up", this.offset)
    );
    this.middleContainer.addChild(
      Cultist.createMember(resources, 4 * WIDTH + 550, "up", this.offset)
    );
    this.frontContainer.addChild(
      Cultist.create(resources, 5 * WIDTH + WIDTH / 2 + 350, this.offset)
    );
    this.textContainer.addChild(
      new TextPopin(
        "You feel something is lurking in the shadows",
        3 * WIDTH + WIDTH / 2,
        HIEGHT / 2,
        "medium",
        this.offset
      )
    );
    this.backContainer.addChild(
      new Mist(resources.mist.texture, 1, {
        offsetStart: 3 * WIDTH,
        offsetEnd: 8 * WIDTH,
        containerOffset: this.offset,
      })
    );
    this.middleContainer.addChild(
      new Mist(resources.mist.texture, 1, {
        offsetStart: 3 * WIDTH,
        offsetEnd: 8 * WIDTH,
        containerOffset: this.offset,
      })
    );

    this.middleContainer.addChild(
      new Mist(resources.mist.texture, 1, {
        offsetStart: 2 * WIDTH,
        offsetEnd: 8 * WIDTH,
        containerOffset: this.offset,
      })
    );
    this.frontContainer.addChild(
      new Mist(resources.mist.texture, 1, {
        offsetStart: 2 * WIDTH,
        offsetEnd: 8 * WIDTH,
        containerOffset: this.offset,
      })
    );

    this.frontContainer.addChild(
      Cultist.createMember(resources, 5 * WIDTH, "down", this.offset)
    );
    this.frontContainer.addChild(
      new Mist(resources.mist.texture, 1, {
        offsetStart: 3 * WIDTH,
        offsetEnd: 8 * WIDTH,
        containerOffset: this.offset,
      })
    );
  }
}
