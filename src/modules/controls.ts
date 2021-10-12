import Manager from "./manager";
import { WIDTH } from "./App";

const Controls = (function () {
  //Private Stuff
  let move = 0;
  let freeze = false;
  //Public Stuff
  return {
    get move() {
      return move;
    },
    stop() {
      const old = move;
      move = 0;
      this.emit("move", { new: move, old });
    },
    init() {
      document.addEventListener("keypress", (e) => {
        if (freeze) return;
        if (move === -1 && Manager.playerX < 0) return this.stop();
        if (move === 1 && Manager.playerX > 14 * WIDTH) return this.stop();

        if (move) return;

        if (e.code === "KeyA")
          if (Manager.playerX > 0) move = -1;
          else this.stop();
        else if (e.code === "KeyD")
          if (Manager.playerX < 14 * WIDTH) move = 1;
          else this.stop();
        else return;
        this.emit("move", { new: move, old: 0 });
      });
      document.addEventListener("keyup", (e) => {
        if (freeze) return;
        if (!move) return;
        this.stop();
      });
    },

    interact(type: "dance" | "fall") {
      if (type === "dance") {
        move = 0;
        this.emit("dance");
      } else if (type === "fall") {
        move = 0;
        freeze = true;
        this.emit("fall");
      }
    },

    emit(type: string, detail?: { new: number; old?: number }) {
      document.dispatchEvent(new CustomEvent(type, { detail }));
    },
  };
})();

export default Controls;
