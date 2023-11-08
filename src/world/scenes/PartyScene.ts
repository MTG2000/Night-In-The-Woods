import Layer from "../layer";
import { loader } from "../../modules/loader";
import BaseScene from "./BaseScene";
import * as PIXI from "pixi.js";
import { app, WIDTH, HIEGHT } from "../../modules/App";
import Campfire from "./objects/campfire";
import Bea from "./objects/bea";
import Jackie from "./objects/jackie";
import BumpkinHead from "./objects/bumpkinHead";
import GuitarPlayer from "./objects/guitarPlayer";
import Gregg from "./objects/gregg";
import { TextPopin } from "./objects/TextPopin";
import Button from "../../UI/Button";
import Player from "../../modules/player";
import Controls from "../../modules/controls";

export default class PartyScene extends BaseScene {
  preload() {
    Campfire.preload();
    Bea.preload();
    Jackie.preload();
    BumpkinHead.preload();
    GuitarPlayer.preload();
    Gregg.preload();
  }

  init(resources: any) {
    this.middleContainer.addChild(
      GuitarPlayer.create(resources, WIDTH + WIDTH / 2 - 450)
    );
    this.middleContainer.addChild(
      BumpkinHead.create(resources, WIDTH + WIDTH / 2 + 250)
    );

    this.middleContainer.addChild(
      Campfire.create(resources, WIDTH + WIDTH / 2)
    );
    this.middleContainer.addChild(
      Bea.create(resources, WIDTH + WIDTH / 2 - 300)
    );
    this.middleContainer.addChild(
      Jackie.create(resources, WIDTH + WIDTH / 2 + 400)
    );
    this.frontContainer.addChild(
      Gregg.create(resources, WIDTH + WIDTH / 2 + 350)
    );

    this.textContainer.addChild(
      new TextPopin(
        "Meet some unique (& weird) characters",
        WIDTH / 2,
        HIEGHT / 2,
        "medium",
        this.offset
      )
    );

    new Button(
      this.offset + WIDTH + WIDTH / 2,
      "dance-keys",
      "Space",
      false,
      () => {
        Controls.interact("dance");
      }
    );
  }
}
