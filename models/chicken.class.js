class Chicken extends MovableObject {
	y = 360;
	height = 70;
	width = 80;
	hitPoints = 1;
	IMAGES_WALKING = [
		"./assets/img/enemies/gallina-1.png",
		"./assets/img/enemies/gallina-2.png",
		"./assets/img/enemies/gallina-3.png",
	];
	IMAGES_DEAD = ["./assets/img/enemies/gallina-dead-1.png"];
	currentImage = 0;
	constructor() {
		super();
		super.loadImage("./assets/img/enemies/gallina-1.png");
		this.x = 200 + Math.random() * 500;
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
