class Endboss extends MovableObject {
	height = 400;
	width = 250;
	y = 55;
	speed = 0.3;
	hitPoints = 30;

	isAlerted = false;
	alrtDistToBoss = 300;
	characterDistance = 2000;
	world;
	shouldMove = true;
	attackRange = 120;
	offset = {
		top: 120,
		right: 10,
		bottom: 15,
		left: -30,
	};

	constructor() {
		super();
		this.loadImage(ImageHub.ENDBOSS.ALERT[0]);
		this.loadImages(ImageHub.ENDBOSS.ALERT);
		this.loadImages(ImageHub.ENDBOSS.WALK);
		this.loadImages(ImageHub.ENDBOSS.HURT);
		this.loadImages(ImageHub.ENDBOSS.DEAD);
		this.loadImages(ImageHub.ENDBOSS.ATTACK);

		this.x = 1700;
		this.animate();
	}

	checkDistanceToCharacter = () => {
		this.characterDistance = this.x - this.world.character.x;

		if (this.characterDistance < this.alrtDistToBoss) {
			this.isAlerted = true;
		}
	};

	updateMovement = () => {
		if (!this.isDead() && this.isAlerted && this.shouldMove) {
			this.x -= this.speed;
		}
	};

	updateAnimation = () => {
		if (this.isDead()) {
			this.playAnimation(ImageHub.ENDBOSS.DEAD);
			return;
		}

		if (this.characterDistance < this.attackRange) {
			this.playAnimation(ImageHub.ENDBOSS.ATTACK);
			this.shouldMove = false;
		} else {
			this.shouldMove = true;
			this.playAnimation(ImageHub.ENDBOSS.WALK);
		}
	};

	animate() {
		IntervalHub.startInterval(this.checkDistanceToCharacter, 300);
		IntervalHub.startInterval(this.updateMovement, 1000 / 60);
		IntervalHub.startInterval(this.updateAnimation, 250);
	}
}
// setInterval(() => {
// 	if (this.isAlerted) {
// 		this.playAnimation(ImageHub.ENDBOSS.ALERT);
// 		//this.attackMode = true;
// 	}
// }, 100);
// setInterval(() => {
// 	if (!this.isDead() && Endboss.isAlerted) this.x -= this.speed;
// }, 1000 / 60);
// setInterval(() => {
// 	if (this.isDead()) {
// 		this.playAnimation(ImageHub.ENDBOSS.DEAD);
// 	} else {
// 		if (!Endboss.isAlerted)
// 			this.playAnimation(ImageHub.ENDBOSS.WALK);
// 	}
// }, 100);