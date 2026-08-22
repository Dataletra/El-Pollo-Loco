class BossBar extends StatusBar {
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
			200, // x
			10, // y
		);
		this.loadImage("assets/img/bars/boss-bar-1.png");
	}
}
