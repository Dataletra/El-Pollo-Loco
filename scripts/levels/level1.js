const level1 = new Level(
	[new Chicken(), new Chicken(), new Chicken(), new Endboss()],
	[new Cloud(), new Cloud()],
	[
		new BackgroundObject("assets/img/background/bgCielo-1.png", -719),
		new BackgroundObject("assets/img/background/bg3-2.png", -719),
		new BackgroundObject("assets/img/background/bg2-2.png", -719),
		new BackgroundObject("assets/img/background/bg1-2.png", -719),

		new BackgroundObject("assets/img/background/bgCielo-1.png", 0),
		new BackgroundObject("assets/img/background/bg3-1.png", 0),
		new BackgroundObject("assets/img/background/bg2-1.png", 0),
		new BackgroundObject("assets/img/background/bg1-1.png", 0),

		new BackgroundObject("assets/img/background/bgCielo-1.png", 719),
		new BackgroundObject("assets/img/background/bg3-2.png", 719),
		new BackgroundObject("assets/img/background/bg2-2.png", 719),
		new BackgroundObject("assets/img/background/bg1-2.png", 719),
		new BackgroundObject("assets/img/background/bgCielo-1.png", 719 * 2),
		new BackgroundObject("assets/img/background/bg3-3.png", 719 * 2),
		new BackgroundObject("assets/img/background/bg2-3.png", 719 * 2),
		new BackgroundObject("assets/img/background/bg1-3.png", 719 * 2),

		new BackgroundObject("assets/img/background/bgCielo-1.png", 719 * 3),
		new BackgroundObject("assets/img/background/bg3-2.png", 719 * 3),
		new BackgroundObject("assets/img/background/bg2-2.png", 719 * 3),
		new BackgroundObject("assets/img/background/bg1-2.png", 719 * 3),
	],

	2200,
	[
		new CollectableObject(),
		new CollectableObject(),
		new CollectableObject(),
		new CollectableObject(),
		new CollectableObject(),
		new CollectableObject(),
		new CollectableObject(),
		new CollectableObject(),
		new CollectableObject(),
		new CollectableObject(),
	],
);
