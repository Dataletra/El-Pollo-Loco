import { CollectableObject } from './collectable-object.class.js';

/**
 * A collectable bottle placed at a random position in the level,
 * using one of two random image variants decided at creation of Object.
 * @class
 */
export class Bottle extends CollectableObject {
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
