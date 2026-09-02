import { StatusBar } from './status-bar.class.js';

/**
 * HUD bar showing how many bottles the character has collected.
 * @class
 */
export class BottleBar extends StatusBar {
	/**
	 * @param {number} [x=10] - X-position of the Bottle bar.
	 * @param {number} [y=105] - Y-position of the Bottle bar.
	 */
	constructor() {
		super(
			[
				"assets/img/bars/bottle-bar-6.png",
				"assets/img/bars/bottle-bar-5.png",
				"assets/img/bars/bottle-bar-4.png",
				"assets/img/bars/bottle-bar-3.png",
				"assets/img/bars/bottle-bar-2.png",
				"assets/img/bars/bottle-bar-1.png",
			],
			10,
			105,
		);
		this.loadImage("assets/img/bars/bottle-bar-1.png");
	}
}
