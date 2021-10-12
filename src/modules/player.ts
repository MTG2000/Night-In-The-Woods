import { loader } from "./loader";
import { AnimatedSpriteMulti } from "./AnimatedSpriteMulti";
import { getAnimationUrls } from "../utils/helperFunctions";
import { app } from "./App";
import gsap from "gsap";
import World from "../world/world";

const Player = (function () {
  loader.add("player", "assets/characters/mae/spritesheet.json");
  let player: AnimatedSpriteMulti;
  return {
    get player() {
      return player;
    },
    init(resources: any) {
      player = new AnimatedSpriteMulti([
        resources.player.textures["NITW_cat_idle_land_right_1.png"],
      ]);
      player.addAnimation(
        "idle-left",
        [resources.player.textures["NITW_cat_idle_land_left_4.png"]],
        0
      );
      player.addAnimation(
        "fall",
        [resources.player.textures["NITW_cat_Fall_1.png"]],
        0
      );
      player.addAnimation(
        "idle-right",
        [resources.player.textures["NITW_cat_idle_land_right_4.png"]],
        0
      );

      player.addAnimation(
        "run-left",
        getAnimationUrls("NITW_cat_run_left_1_", resources.player.textures, 23),
        0.5
      );
      player.addAnimation(
        "run-right",
        getAnimationUrls(
          "NITW_cat_run_right_1_",
          resources.player.textures,
          23
        ),
        0.5
      );
      player.addAnimation(
        "dance",
        getAnimationUrls(
          "NITW_cat_dance_Right_loop_",
          resources.player.textures,
          24
        ),
        0.5
      );

      document.addEventListener("move", (e: CustomEventInit) => {
        let detail = e.detail;
        if (detail.new === 0)
          player.setAnimation(detail.old === 1 ? "idle-right" : "idle-left");
        else player.setAnimation(detail.new === 1 ? "run-right" : "run-left");
      });
      document.addEventListener("dance", () => {
        player.setAnimation("dance");
      });
      document.addEventListener("fall", () => {
        setTimeout(() => {
          player.setAnimation("fall");
          gsap.to(player, {
            y: 200,
            duration: 2,
            ease: "easeOut",
            onComplete: () => {
              gsap.to(player, {
                y: player.y + 30,
                repeat: -1,
                duration: 2,
                yoyo: true,
                ease: "easeInOut",
                yoyoEase: "easeInOut",
              });
            },
          });
        }, 400);
      });
      player.setAnimation("idle-right");
      player.anchor.x = 0.5;
      player.anchor.y = 0.5;
      player.scale.set(0.4);
      player.x = app.renderer.width / 2;
      player.y = World.groundLine + 130;
    },
  };
})();

export default Player;
