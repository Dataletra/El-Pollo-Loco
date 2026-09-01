import { CollectableObject } from './collectable-object.class.js';

export class Coin extends CollectableObject {
	static amount = 0;

	constructor() {
		super();
		this.x = 200 + Math.random() * 1500;
		this.y = 310 - Math.random() * 200;
		console.log(this.y);
		super.loadImage("./assets/img/coin/coin-1.png");
	}
}
