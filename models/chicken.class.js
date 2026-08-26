class Chicken extends MovableObject {
	y = 360;
	height = 70;
	width = 80;
	hitPoints = 1;
	currentImage = 0;
	constructor() {
		super();
		super.loadImage(ImageHub.CHICKEN.WALKING[0]);
		this.x = 500 + Math.random() * 1200;
		this.speed = 0.15 + Math.random() * 0.5;
		this.loadImages(ImageHub.CHICKEN.WALKING);
		this.loadImages(ImageHub.CHICKEN.DEAD);
		this.animate();
	}

	updateMovement = () => {
		if (!this.isDead()) {
			this.x -= this.speed;
		}
	};

	updateAnimation = () => {
		if (this.isDead()) {
			this.playAnimation(ImageHub.CHICKEN.DEAD);
		} else {
			this.playAnimation(ImageHub.CHICKEN.WALKING);
		}
	};

	animate() {
		IntervalHub.startInterval(this.updateMovement, 1000 / 60);
		IntervalHub.startInterval(this.updateAnimation, 100);
	}
}
