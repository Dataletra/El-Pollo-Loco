import { Endboss } from './endboss.class.js';
import { ImageHub } from './imageHub.class.js';

export class Egg extends Endboss {
	speed = 0.4;
	constructor() {
		super();
		this.loadImage(ImageHub.ENDBOSS.EGG[0]);
		this.loadImages(ImageHub.ENDBOSS.EGG);
		this.animate();
	}
	animate() {
		setInterval(() => {
			console.log("animation?");

			this.playAnimation(ImageHub.ENDBOSS.EGG);
		}, 500);
		setInterval(() => {
			this.x -= this.speed;
		}, 1000 / 60);
	}
}
