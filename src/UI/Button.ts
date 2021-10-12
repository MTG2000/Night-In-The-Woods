import { app } from "../modules/App";
import Manager from "../modules/manager";
import gsap from "gsap";

export default class Button {
  constructor(
    offset: number,
    uiId: string,
    keyboardCode: string,
    isOneTime = false,
    onClick: () => void = () => {}
  ) {
    const el = document.getElementById(uiId);
    if (!el) return;

    let inside = false;
    let clicked = false;
    const threshold = 200;
    app.ticker.add(() => {
      if (clicked && isOneTime) return;
      if (!inside && Math.abs(Manager.playerX - offset) < threshold) {
        inside = true;
        clicked = false;
        gsap.fromTo(
          el,
          { y: -400 },
          { y: 0, opacity: 1, visibility: "visible", ease: "easeInOut" }
        );
        document.addEventListener("keypress", eventListener);
      } else if (inside && Math.abs(Manager.playerX - offset) > threshold) {
        inside = false;
        gsap.to(el, {
          y: -100,
          opacity: 0,
          onComplete: () => {
            el.style.visibility = "hidden";
          },
        });
        document.removeEventListener("keypress", eventListener);
      }
    });

    const eventListener = (e: KeyboardEvent) => {
      if (!inside || clicked) return;
      if (e.code === keyboardCode) {
        onClick();
        clicked = true;
        inside = true;
        gsap.to(el, {
          y: -100,
          opacity: 0,
          onComplete: () => {
            el.style.visibility = "hidden";
          },
        });
      }
    };
  }
}
