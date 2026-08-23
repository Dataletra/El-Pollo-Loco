class Endboss extends MovableObject {
	height = 400;
	width = 250;
	y = 55;
	speed = 0.3;
	static isAlerted;
	attackMode = false;

	constructor() {
		super();
		this.loadImage(ImageHub.ENDBOSS.ALERT[0]);
		this.loadImages(ImageHub.ENDBOSS.ALERT);
		this.loadImages(ImageHub.ENDBOSS.WALK);
		this.loadImages(ImageHub.ENDBOSS.HURT);
		this.loadImages(ImageHub.ENDBOSS.DEAD);
		this.x = 2500;
		this.animate();
	}

	animate() {
		setInterval(() => {
			if (Endboss.isAlerted) {
				this.playAnimation(ImageHub.ENDBOSS.ALERT);
				this.attackMode = true;
			}
		}, 100);
		setInterval(() => {
			if (!this.isDead() && Endboss.isAlerted) this.x -= this.speed;
		}, 1000 / 60);
		setInterval(() => {
			if (this.isDead()) {
				this.playAnimation(ImageHub.ENDBOSS.DEAD);
			} else {
				if (!Endboss.isAlerted)
					this.playAnimation(ImageHub.ENDBOSS.WALK);
			}
		}, 100);
	}
	attack() {
		return this.attackMode;
	}
}

//boss walks towards you all the time?
//boss attacks you by throwing egg?
//boss
