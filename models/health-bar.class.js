import { StatusBar } from './status-bar.class.js';

/**
 * HUD bar showing the character's remaining health.
 * @class
 */
export class HealthBar extends StatusBar {
	/**
 * @param {number} [x=10] - X-position of the Coin bar.
 * @param {number} [y=0] - Y-position of the Coin bar.
 */
	constructor() {
		super(
			[
				"assets/img/bars/life-bar-1.png",
				"assets/img/bars/life-bar-2.png",
				"assets/img/bars/life-bar-3.png",
				"assets/img/bars/life-bar-4.png",
				"assets/img/bars/life-bar-5.png",
				"assets/img/bars/life-bar-6.png",
			],
			10, // x
			0, // y
		);
	}
}
