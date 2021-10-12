import Layer from "../layer";
import { loader } from "../../modules/loader";
import BaseScene from "./BaseScene";
import * as PIXI from "pixi.js";
import { app, WIDTH, HIEGHT } from "../../modules/App";
import FallingLeaves from "./FallingLeaves";
import Button from "../../UI/Button";
export default class Forest extends BaseScene {
  leavesContainer: PIXI.Container;

  constructor(args: number) {
    super(args);
    this.leavesContainer = new PIXI.Container();
  }

  preload() {
    for (let i = 1; i <= 6; i++) {
      loader.add(`forest1_bg_${i}`, `assets/level/forest/bg-${i}.png`);
    }
    loader.add(`bushes`, `assets/level/forest/bushes.png`);
    loader.add(`trees_front`, `assets/level/forest/trees-front.png`);
    loader.add(`leaf`, `assets/level/forest/leaf.png`);

    loader.add(`mist`, `assets/level/forest/mist.png`);
  }

  init(resources: any) {
    // this.backContainer.addChild(new Layer(resources.forest1_bg_6.texture, 0.2));
    // this.backContainer.addChild(new Layer(resources.forest1_bg_5.texture, 0.2));

    // this.backContainer.addChild(
    //   new Layer(resources.forest1_bg_4.texture, 0.2, {
    //     offsetStart: WIDTH,
    //     shiftY: 90,
    //   })
    // );
    // this.backContainer.addChild(
    //   new Layer(resources.forest1_bg_3.texture, 0.4, {
    //     offsetStart: 2 * WIDTH,
    //     shiftY: 90,
    //   })
    // );
    // this.backContainer.addChild(new Layer(resources.forest1_bg_2.texture, 0.7));
    // this.backContainer.addChild(new Layer(resources.forest1_bg_1.texture, 1.0));
    const t = new PIXI.Texture(
      resources.bushes.texture,
      new PIXI.Rectangle(
        0,
        resources.bushes.texture.height - app.renderer.height,
        resources.bushes.texture.width,
        app.renderer.height
      )
    );

    // this.middleContainer.addChild(new Layer(t, 1.0, { shiftY: -HIEGHT * 0.4 }));

    // this.frontContainer.addChild(
    //   new Layer(resources.trees_front.texture, 1, {
    //     offsetStart: WIDTH,
    //   })
    // );

    new Button(WIDTH / 2, "move-keys", "KeyD");

    this.leavesContainer.addChild(
      new FallingLeaves(resources.leaf.texture, 0, 2 * WIDTH)
    );
    this.leavesContainer.addChild(
      new FallingLeaves(resources.leaf.texture, 2 * WIDTH, 4 * WIDTH, 60)
    );
  }
}
