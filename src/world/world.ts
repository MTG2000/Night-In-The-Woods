import { app, WIDTH, HIEGHT } from "../modules/App";
import BaseScene from "./scenes/BaseScene";
import * as PIXI from "pixi.js";
import Player from "../modules/player";
import Campfire from "./scenes/objects/campfire";
import { loader } from "../modules/loader";
import Layer from "./layer";
import Manager from "../modules/manager";
import Controls from "../modules/controls";
import Forest from "./scenes/Forest";
import PartyScene from "./scenes/PartyScene";
import { TextPopin, FONT_FAMILY } from "./scenes/objects/TextPopin";
import FontFaceObserver from "fontfaceobserver";
import Forest1 from "./scenes/Forest_1";
import Forest2 from "./scenes/Forest_2";
import Forest3 from "./scenes/Forest_3";
import Forest4 from "./scenes/Forest_4";
import gsap from "gsap";
import AstralCat from "./scenes/objects/astralCat";

const World = (function () {
  // scenes.push(new Forest2(2000));

  let scenes: BaseScene[] = [];

  scenes.push(new Forest1(0));
  scenes.push(new Forest2(WIDTH));
  scenes.push(new PartyScene(3 * WIDTH));
  scenes.push(new Forest3(5 * WIDTH));
  scenes.push(new Forest4(9 * WIDTH));

  loader.add(`sky`, `assets/level/forest/sky.png`);

  return {
    get groundLine(): number {
      return app.renderer.height * 0.6;
    },

    async init(resources: any) {
      try {
        const font = new FontFaceObserver(FONT_FAMILY, { weight: 700 });
        await font.load();
      } catch (error) {
        console.log("Font Failed to load");
      }

      for (const scene of scenes) {
        scene.init(resources);
      }
      const sky = new Layer(resources.sky.texture, Manager.moveSpeed * 0.1);

      app.stage.addChild(sky);

      //   Draw Back Stuff
      for (const scene of scenes) {
        scene.backContainer.pivot.set(0, 1);
        scene.backContainer.position.y = -(
          app.renderer.height - this.groundLine
        );
        app.stage.addChild(scene.backContainer);
      }

      //   Draw Ground
      const graphics = new PIXI.Graphics();
      graphics.lineStyle(2, 0x212227, 0.1);
      graphics.beginFill(0x212227, 1);
      graphics.drawRect(
        0,
        this.groundLine - 10,
        app.renderer.width,
        app.renderer.height
      );
      app.stage.addChild(graphics);

      //   Draw Middle Stuff
      for (const scene of scenes) {
        app.stage.addChild(scene.middleContainer);
      }

      app.stage.addChild(Player.player);

      for (const scene of scenes) {
        if (scene instanceof Forest) app.stage.addChild(scene.leavesContainer);
      }

      //   Draw Front Stuff
      for (const scene of scenes) {
        app.stage.addChild(scene.frontContainer);
      }

      for (const scene of scenes) {
        app.stage.addChild(scene.textContainer);
      }

      app.stage.addChild(AstralCat.sprite as PIXI.Sprite);

      document.addEventListener("fall", () => {
        gsap.to(AstralCat.sprite as PIXI.Sprite, {
          x: WIDTH,
          ease: "easeOut",
          duration: 0.4,
          onComplete: () => {
            gsap.to(graphics, {
              y: -2 * HIEGHT,
              duration: 2,
              ease: "easeOut",
            });
            gsap.to(AstralCat.sprite as PIXI.Sprite, {
              y: -2 * HIEGHT,
              duration: 2,
              ease: "easeOut",
            });
            gsap.to(scenes[scenes.length - 1].backContainer, {
              y: -2 * HIEGHT,
              duration: 2,
              ease: "easeOut",
            });
            gsap.to(sky, {
              y: -2 * HIEGHT,
              duration: 2,
              ease: "easeOut",
              onComplete: () => {
                gsap.to(document.getElementById("stores"), {
                  opacity: 1,
                  visibility: "visible",
                });
              },
            });
          },
        });
      });
    },
  };
})();

export default World;
