import { BackgroundObject } from '../../models/background-object.class.js';
import { Level } from '../../models/level.class.js';
import { Chicken } from '../../models/chicken.class.js';
import { Pollito } from '../../models/small-chicken.class.js';
import { Endboss } from '../../models/endboss.class.js';
import { Cloud } from '../../models/cloud.class.js';
import { Bottle } from '../../models/bottle-object.class.js';
import { Coin } from '../../models/coin-object.class.js';

export let level1;

export function initLevel() {
	BackgroundObject.reset();
	level1 = new Level(
		[
			new Chicken(),
			new Chicken(),
			new Chicken(),
			new Pollito(),
			new Pollito(),
			new Endboss(),
		],
		[new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],
		[
			new BackgroundObject("assets/img/background/bgCielo-1.png"),
			new BackgroundObject("assets/img/background/bg3-2.png"),
			new BackgroundObject("assets/img/background/bg2-2.png"),
			new BackgroundObject("assets/img/background/bg1-2.png"),

			new BackgroundObject("assets/img/background/bgCielo-1.png"),
			new BackgroundObject("assets/img/background/bg3-1.png"),
			new BackgroundObject("assets/img/background/bg2-1.png"),
			new BackgroundObject("assets/img/background/bg1-1.png"),

			new BackgroundObject("assets/img/background/bgCielo-1.png"),
			new BackgroundObject("assets/img/background/bg3-2.png"),
			new BackgroundObject("assets/img/background/bg2-2.png"),
			new BackgroundObject("assets/img/background/bg1-2.png"),
			new BackgroundObject("assets/img/background/bgCielo-1.png"),
			new BackgroundObject("assets/img/background/bg3-3.png"),
			new BackgroundObject("assets/img/background/bg2-3.png"),
			new BackgroundObject("assets/img/background/bg1-3.png"),

			new BackgroundObject("assets/img/background/bgCielo-1.png"),
			new BackgroundObject("assets/img/background/bg3-2.png"),
			new BackgroundObject("assets/img/background/bg2-2.png"),
			new BackgroundObject("assets/img/background/bg1-2.png"),

			new BackgroundObject("assets/img/background/bgCielo-1.png"),
			new BackgroundObject("assets/img/background/bg3-2.png"),
			new BackgroundObject("assets/img/background/bg2-2.png"),
			new BackgroundObject("assets/img/background/bg1-2.png"),

			new BackgroundObject("assets/img/background/bgCielo-1.png"),
			new BackgroundObject("assets/img/background/bg3-2.png"),
			new BackgroundObject("assets/img/background/bg2-2.png"),
			new BackgroundObject("assets/img/background/bg1-2.png"),
		],

		2200, //level_end_x
		[
			new Bottle(),
			new Bottle(),
			new Bottle(),
			new Bottle(),
			new Bottle(),
			new Bottle(),
			new Bottle(),
			new Bottle(),
			new Bottle(),
			new Bottle(),
		],
		[
			new Coin(),
			new Coin(),
			new Coin(),
			new Coin(),
			new Coin(),
			new Coin(),
			new Coin(),
			new Coin(),
			new Coin(),
			new Coin(),
		],
	);
}
