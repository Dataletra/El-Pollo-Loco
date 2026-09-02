/**
 * Holds all the static content that makes up a level: enemies, clouds,
 * background tiles, collectables, and the x position where the level ends.
 * @class
 */
export class Level {
	enemies;
	clouds;
	backgroundObjects;
	level_end_x;
	bottles;
	coins;

	/**
	 * @param {object[]} enemies - Enemy instances (Chicken, Pollito, Endboss).
	 * @param {object[]} clouds - Cloud instances.
	 * @param {object[]} backgroundObjects - BackgroundObject instances.
	 * @param {number} level_end_x - X coordinate where the level ends.
	 * @param {object[]} bottles - Bottle instances available to collect.
	 * @param {object[]} coins - Coin instances available to collect.
	 */
	constructor(
		enemies,
		clouds,
		backgroundObjects,
		level_end_x,
		bottles,
		coins,
	) {
		this.enemies = enemies;
		this.clouds = clouds;
		this.backgroundObjects = backgroundObjects;
		this.level_end_x = level_end_x;
		this.bottles = bottles;
		this.coins = coins;
	}
}
