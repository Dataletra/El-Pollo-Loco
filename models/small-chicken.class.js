class Pollito extends MovableObject {
	y = 390;
	height = 40;
	width = 60;
	hitPoints = 1;
	IMAGES_WALKING = [
		"./assets/img/enemies/pollito-1.png",
		"./assets/img/enemies/pollito-2.png",
		"./assets/img/enemies/pollito-3.png",
	];
	IMAGES_DEAD = ["./assets/img/enemies/pollito-dead-1.png"];
	currentImage = 0;
	constructor() {
		super();
		super.loadImage("./assets/img/enemies/pollito-1.png");
		this.x = 500 + Math.random() * 1200;
		this.speed = 0.15 + Math.random() * 0.5;
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_DEAD);
		this.animate();
	}
	animate() {
		setInterval(() => {
			if (!this.isDead()) this.x -= this.speed;
		}, 1000 / 60);
		setInterval(() => {
			if (this.isDead()) {
				this.playAnimation(this.IMAGES_DEAD);
			} else {
				this.playAnimation(this.IMAGES_WALKING);
			}
		}, 100);
	}
}
