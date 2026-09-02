import { StatusBar } from './status-bar.class.js';

/**
 * HUD bar showing how many coins the character has collected.
 * @class
 */
export class CoinBar extends StatusBar {
	/**
	 * @param {number} [x=10] - X-position of the Coin bar.
	 * @param {number} [y=50] - Y-position of the Coin bar.
	 */
	constructor() {
		super(
			[
				"assets/img/bars/coin-bar-6.png",
				"assets/img/bars/coin-bar-5.png",
				"assets/img/bars/coin-bar-4.png",
				"assets/img/bars/coin-bar-3.png",
				"assets/img/bars/coin-bar-2.png",
				"assets/img/bars/coin-bar-1.png",
			],
			10, // x
			50, // y
		);
		this.loadImage("assets/img/bars/coin-bar-1.png");
	}
}
