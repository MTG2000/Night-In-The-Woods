import * as PIXI from "pixi.js";
import "./modules/App";
import { loader } from "./modules/loader";
import Controls from "./modules/controls";
import Manager from "./modules/manager";
import Player from "./modules/player";
import World from "./world/world";

loader.onComplete.add(setup);
// loader.add("assets/background_music.mp3");
loader.load();

function setup(
  _: PIXI.Loader,
  resources: PIXI.utils.Dict<PIXI.LoaderResource>
) {
  Controls.init();
  Manager.init();
  Player.init(resources);
  World.init(resources);
}
