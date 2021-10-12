import * as PIXI from "pixi.js";
import { playMusic } from "./music";

export const loader = new PIXI.Loader(); // you can also create your own if you want

const panel = document.querySelector(".loading") as HTMLDivElement;
const progressBarIn = document.querySelector(
  ".progress-bar-in"
) as HTMLDivElement;
const progressBar = document.querySelector(
  ".progress-bar-out"
) as HTMLDivElement;
const progressText = document.querySelector(
  ".loading .percent"
) as HTMLSpanElement;
const progressUrl = document.querySelector(".loading .url") as HTMLSpanElement;
const startBtn = document.querySelector(".loading button") as HTMLButtonElement;

loader.onProgress.add((loader, resource) => {
  progressBarIn.style.transform = `scaleX(${loader.progress / 100})`;
  progressText.textContent = loader.progress.toString();
  progressUrl.textContent = resource.url;
});

loader.onComplete.add(() => {
  startBtn.style.visibility = "visible";
  progressUrl.style.visibility = "hidden";
  progressBar.style.visibility = "hidden";
  startBtn.addEventListener("click", () => {
    panel.style.display = "none";
    playMusic();
  });
});
