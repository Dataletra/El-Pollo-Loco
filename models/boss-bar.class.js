import { StatusBar } from './status-bar.class.js';

/**
 * Health bar shown for the end boss, positioned in the top-right HUD area.
 */
export class BossBar extends StatusBar {
	constructor() {
		super(
			[
				"assets/img/bars/boss-bar-1.png",
				"assets/img/bars/boss-bar-2.png",
				"assets/img/bars/boss-bar-3.png",
				"assets/img/bars/boss-bar-4.png",
				"assets/img/bars/boss-bar-5.png",
				"assets/img/bars/boss-bar-6.png",
			],
			500, // x
			10, // y
		);
		this.loadImage("assets/img/bars/boss-bar-1.png");
	}
}
