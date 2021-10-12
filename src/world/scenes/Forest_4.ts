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
import Mist from "./Mist";
import Moon from "./objects/moon";
import Controls from "../../modules/controls";
import AstralCat from "./objects/astralCat";
export default class Forest4 extends BaseScene {
  constructor(args: number) {
    super(args);
  }

  preload() {
    Moon.preload();
    AstralCat.preload();
  }

  init(resources: any) {
    this.backContainer.addChild(Moon.create(resources, WIDTH / 2));
    new Button(
      (this.offset + WIDTH / 2) / 0.7 - 250,
      "moon-keys",
      "Space",
      false,
      () => {
        Controls.interact("fall");
      }
    );
    AstralCat.create(resources, 0);
  }
}
