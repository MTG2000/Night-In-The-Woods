import { app, WIDTH } from "./App";
import Manager from "./manager";
import gsap, { SteppedEase } from "gsap";

const url = "assets/background_music.mp3";
let audio: HTMLAudioElement = new Audio();

export function playMusic() {
  audio = new Audio(url);
  audio.volume = 0.7;
  audio.play();
}

app.ticker.add(() => {
  if (Manager.playerX > 7 * WIDTH)
    gsap.to(audio, { volume: 0, duration: 3, ease: "linear" });
});
