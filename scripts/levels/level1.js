let level1;
function initLevel() {
	level1 = new Level(
		[
			new Chicken(),
			new Chicken(),
			new Chicken(),
			new Pollito(),
			new Pollito(),
			new Endboss(),
		],
		[new Cloud(), new Cloud()],
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