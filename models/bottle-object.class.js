import { CollectableObject } from './collectable-object.class.js';

export class Bottle extends CollectableObject {
	static amount = 0;
	height = 100;
	width = 80;
	y = 330;
	constructor() {
		super();
		this.x = 200 + Math.random() * 1500;
		let i = Math.random();
		if (i < 0.5) {
			super.loadImage("./assets/img/bottle/bottle1-1.png");
		} else {
			super.loadImage("./assets/img/bottle/bottle2-1.png");
		}
	}
}
