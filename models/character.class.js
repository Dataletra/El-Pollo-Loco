class Character extends MovableObject {
	height = 280;
	y = 150;
	lastInput = 0;
	world;

	constructor() {
		super();
		super.loadImage("./assets/img/character/idle-1.png");
		this.loadImages(ImageHub.PEPE.WALKING);
		this.loadImages(ImageHub.PEPE.IDLE);
		this.loadImages(ImageHub.PEPE.JUMP);
		this.loadImages(ImageHub.PEPE.HURT);
		this.loadImages(ImageHub.PEPE.DEAD);
		this.loadImages(ImageHub.PEPE.SLEEPING);

		this.applyGravity();
		this.animate();
	}
	animate() {
		setInterval(() => {
			if (Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
				this.moveRight();
			} else if (Keyboard.LEFT && this.x > 0) {
				this.moveLeft();
			}
			if (Keyboard.UP && !this.isAboveGround()) {
				this.jump();
			}
			this.world.camera_x = -this.x + 100;
		}, 1000 / 60);

		setInterval(() => {
			let currentTime = new Date().getTime();
			let timePassed = currentTime - this.lastInput;
			if (this.isDead()) {
				this.playAnimation(ImageHub.PEPE.DEAD);
			} else if (this.isHurt()) {
				this.playAnimation(ImageHub.PEPE.HURT);
				this.lastInput = currentTime;
			} else if (this.isAboveGround()) {
				this.playAnimation(ImageHub.PEPE.JUMP);
				this.lastInput = currentTime;
			} else if (Keyboard.RIGHT || Keyboard.LEFT) {
				this.playAnimation(ImageHub.PEPE.WALKING);
				this.lastInput = currentTime;
			} else if (timePassed > 10000) {
				this.playAnimation(ImageHub.PEPE.SLEEPING);
			} else {
				this.playAnimation(ImageHub.PEPE.IDLE);
			}
		}, 100);
	}

	jump() {
		this.speedY = 30;
	}
}
