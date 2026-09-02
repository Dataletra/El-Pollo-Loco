import { CollectableObject } from './collectable-object.class.js';

/**
 * A collectable coin placed at a random position in the level.
 * @class
 */
export class Coin extends CollectableObject {

	constructor() {
		super();
		this.x = 200 + Math.random() * 1500;
		this.y = 310 - Math.random() * 200;
		super.loadImage("./assets/img/coin/coin-1.png");
	}
}
