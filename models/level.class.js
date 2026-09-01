export class Level {
	enemies;
	clouds;
	backgroundObjects;
	level_end_x;
	bottles;
	coins;
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
