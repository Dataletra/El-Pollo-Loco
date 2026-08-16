class Endboss extends MovableObject {
	height = 400;
	width = 250;
	y = 55;
	IMAGES_ALERT = [
		"./assets/img/enemies/boss-alert-1.png",
		"./assets/img/enemies/boss-alert-2.png",
		"./assets/img/enemies/boss-alert-3.png",
		"./assets/img/enemies/boss-alert-4.png",
		"./assets/img/enemies/boss-alert-5.png",
		"./assets/img/enemies/boss-alert-6.png",
		"./assets/img/enemies/boss-alert-7.png",
	];

	constructor() {
		super();
		this.loadImage(this.IMAGES_ALERT[0]);
		this.loadImages(this.IMAGES_ALERT);
		this.x = 2500;
		this.animate();
	}

	animate() {
		setInterval(() => {
			this.playAnimation(this.IMAGES_ALERT);
		}, 100);
	}
}
