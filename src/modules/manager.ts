import { app, WIDTH } from "./App";
import Controls from "./controls";

const Manager = (function () {
  let playerX = 0;
  let moveSpeed = 6;

  return {
    get moveSpeed() {
      return moveSpeed;
    },
    get playerX() {
      return playerX;
    },
    init() {
      playerX = WIDTH / 2;
      app.ticker.add((dt) => {
        playerX += dt * moveSpeed * Controls.move;
      });
    },
  };
})();

export default Manager;
