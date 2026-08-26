class Character extends MovableObject {
	height = 280;
	y = 150;
	lastInput = 0;
	world;
	deathSoundPlayed = false;
	isRunning = false;
	isSleeping = false;
	offset = {
		top: 120,
		right: 10,
		bottom: 0,
		left: 15,
	}
	constructor() {
		super();
		super.loadImage(ImageHub.PEPE.IDLE[0]);
		this.loadImages(ImageHub.PEPE.WALKING);
		this.loadImages(ImageHub.PEPE.IDLE);
		this.loadImages(ImageHub.PEPE.JUMP);
		this.loadImages(ImageHub.PEPE.HURT);
		this.loadImages(ImageHub.PEPE.DEAD);
		this.loadImages(ImageHub.PEPE.SLEEPING);

		this.applyGravity();
		this.animate();
		this.getRealFrame();
	}
	updateMovement = () => {
		if (Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
			this.moveRight();
		} else if (Keyboard.LEFT && this.x > 0) {
			this.moveLeft();
		}
		if (Keyboard.UP && !this.isAboveGround()) {
			this.jump();
		}

		this.world.camera_x = -this.x + 100;
		this.updateWalkingSound();
	};
	updateAnimation = () => {
		let wakeUp = false;
		let currentTime = new Date().getTime();
		let timePassed = currentTime - this.lastInput;
		if (this.isDead()) {
			this.playAnimation(ImageHub.PEPE.DEAD);
			if (!this.deathSoundPlayed) {
				AudioHub.playOne(AudioHub.CHARACTER_DEAD);
				this.deathSoundPlayed = true;
			}

		} else if (this.isHurt()) {
			wakeUp = true;
			this.playAnimation(ImageHub.PEPE.HURT);
			this.lastInput = currentTime;
		} else if (this.isAboveGround()) {
			this.playAnimation(ImageHub.PEPE.JUMP);
			this.lastInput = currentTime;
		} else if (Keyboard.RIGHT || Keyboard.LEFT) {
			this.playAnimation(ImageHub.PEPE.WALKING);
			this.lastInput = currentTime;
		} else if (timePassed > 5000) {
			this.playAnimation(ImageHub.PEPE.SLEEPING);
			if (!this.isSleeping) {
				this.isSleeping = true;
				AudioHub.CHARACTER_SNORING.file.loop = true;
				AudioHub.playOne(AudioHub.CHARACTER_SNORING);
			}
		} else {
			this.stopSnoring();
			this.playAnimation(ImageHub.PEPE.IDLE);
		}
	};

	stopSnoring() {
		if (this.isSleeping) {
			this.isSleeping = false;
			AudioHub.stopOne(AudioHub.CHARACTER_SNORING);
		}
	};

	updateWalkingSound() {
		let isMoving = (Keyboard.RIGHT || Keyboard.LEFT) && !this.isAboveGround() && !this.isDead();
		if (isMoving && !this.isRunning) {
			AudioHub.playOne(AudioHub.CHARACTER_RUN);
			this.isRunning = true;
		}
		else if (!isMoving && this.isRunning) {
			AudioHub.stopOne(AudioHub.CHARACTER_RUN);
			this.isRunning = false;
		}
	}

	animate() {
		IntervalHub.startInterval(this.updateMovement, 1000 / 60);
		IntervalHub.startInterval(this.updateAnimation, 100);
	}
	jump() {
		this.speedY = 30;
		AudioHub.playOne(AudioHub.CHARACTER_JUMP);
	}
}
