class Endboss extends MovableObject {
	height = 400;
	width = 250;
	y = 55;
	speed = 0.6;
	hitPoints = 100;
	isAlerted = false;
	alrtDistToBoss = 600;
	characterDistance = 2000;
	world;
	shouldMove = true;
	attackRange = 120;
	isAlerting = false;
	hadFirstContact = false;
	deathSoundPlayed = false;
	encounterSoundPlayed = false;
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

		this.x = 2400;
		this.animate();
	};

	checkDistanceToCharacter = () => {
		if (!this.world || !this.world.character) return;
		this.characterDistance = this.x - this.world.character.x;
		if (this.characterDistance < this.alrtDistToBoss && !this.hadFirstContact) {
			this.hadFirstContact = true;
			this.isAlerted = true;
			this.isAlerting = true;
			this.alertCounter = 0;
		}
		//makes sure that character cant jump on boss by restricting end of world
		this.world.level.level_end_x = this.x - 130;
	};

	updateMovement = () => {
		if (!this.isDead() && this.isAlerted && !this.isAlerting && this.shouldMove) {
			this.x -= this.speed;
		}
	};

	updateAnimation = () => {
		if (this.isDead()) {
			this.handleDeadState();
			return;
		}
		if (this.isHurt()) {
			this.playAnimation(ImageHub.ENDBOSS.HURT);
			return;
		}
		if (this.isAlerting) {
			this.handleAlertState();
			return;
		}
		if (this.isAlerted) {
			this.handleAttackOrMove();
		}
	};

	handleAttackOrMove() {
		if (this.characterDistance < this.attackRange) {
			this.attack();
		} else {
			this.move();
		}
	};

	handleAlertState() {
		this.playAnimation(ImageHub.ENDBOSS.ALERT);
		this.shouldMove = false;
		if (!this.encounterSoundPlayed) {
			AudioHub.playOne(AudioHub.ENDBOSS_APPROACH);
			this.encounterSoundPlayed = true;
		}
		this.alertCounter++;
		if (this.alertCounter >= 12) {
			this.isAlerting = false;
		}
	};

	handleDeadState() {
		this.playAnimation(ImageHub.ENDBOSS.DEAD);
		if (!this.deathSoundPlayed) {
			AudioHub.playOne(AudioHub.CHICKEN_DEAD);
			this.deathSoundPlayed = true;
		}
	};

	animate() {
		IntervalHub.startInterval(this.checkDistanceToCharacter, 300);
		IntervalHub.startInterval(this.updateMovement, 1000 / 60);
		IntervalHub.startInterval(this.updateAnimation, 250);
	};

	attack() {
		this.playAnimation(ImageHub.ENDBOSS.ATTACK);
		this.shouldMove = false;
	};

	move() {
		this.playAnimation(ImageHub.ENDBOSS.WALK);
		this.shouldMove = true;
	};
}