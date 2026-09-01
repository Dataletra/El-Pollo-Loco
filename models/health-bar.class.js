import { StatusBar } from './status-bar.class.js';

export class HealthBar extends StatusBar {
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
