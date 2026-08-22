class Endboss extends MovableObject {
	height = 400;
	width = 250;
	y = 55;

	constructor() {
		super();
		this.loadImage(ImageHub.ENDBOSS.ALERT[0]);
		this.loadImages(ImageHub.ENDBOSS.ALERT);
		this.x = 2500;
		this.animate();
	}

	animate() {
		setInterval(() => {
			this.playAnimation(ImageHub.ENDBOSS.ALERT);
		}, 100);
	}
}
