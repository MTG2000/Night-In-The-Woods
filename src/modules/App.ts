import * as PIXI from "pixi.js";

export let app = new PIXI.Application({ resizeTo: window });
document.body.appendChild(app.view);
export const WIDTH = Math.max(app.renderer.width, 800);
export const HIEGHT = app.renderer.height;
