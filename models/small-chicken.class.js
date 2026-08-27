class Pollito extends MovableObject {
	y = 390;
	height = 40;
	width = 60;
	hitPoints = 1;
	currentImage = 0;

	constructor() {
		super();
		super.loadImage(ImageHub.POLLITO.WALKING[0]);
		this.x = 500 + Math.random() * 1200;
		this.speed = 0.15 + Math.random() * 0.5;
		this.loadImages(ImageHub.POLLITO.WALKING);
		this.loadImages(ImageHub.POLLITO.DEAD);
		this.animate();
	}

	updateMovement = () => {
		if (!this.isDead()) {
			this.x -= this.speed;
		}
	};

	updateAnimation = () => {
		if (this.isDead()) {
			this.playAnimation(ImageHub.POLLITO.DEAD);
			if (!this.deathSoundPlayed) {
				AudioHub.playOne(AudioHub.CHICKEN_DEAD_2);
				this.deathSoundPlayed = true;
			}
		} else {
			this.playAnimation(ImageHub.POLLITO.WALKING);
		}
	};

	animate() {
		IntervalHub.startInterval(this.updateMovement, 1000 / 60);
		IntervalHub.startInterval(this.updateAnimation, 100);
	}
}