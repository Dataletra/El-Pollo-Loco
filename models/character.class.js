class Character extends MovableObject {
	height = 280;
	y = 150;
	world;
	IMAGES_WALKING = [
		"./assets/img/character/walk-1.png",
		"./assets/img/character/walk-2.png",
		"./assets/img/character/walk-3.png",
		"./assets/img/character/walk-4.png",
		"./assets/img/character/walk-5.png",
		"./assets/img/character/walk-6.png",
	];
	IMAGES_IDLE = [
		"./assets/img/character/idle-1.png",
		"./assets/img/character/idle-2.png",
		"./assets/img/character/idle-3.png",
		"./assets/img/character/idle-4.png",
		"./assets/img/character/idle-5.png",
		"./assets/img/character/idle-6.png",
		"./assets/img/character/idle-7.png",
		"./assets/img/character/idle-8.png",
		"./assets/img/character/idle-9.png",
		"./assets/img/character/idle-10.png",
	];
	IMAGES_JUMPING = [
		"assets/img/character/jump-1.png",
		"assets/img/character/jump-2.png",
		"assets/img/character/jump-3.png",
		"assets/img/character/jump-4.png",
		"assets/img/character/jump-5.png",
		"assets/img/character/jump-6.png",
		"assets/img/character/jump-7.png",
		"assets/img/character/jump-8.png",
		"assets/img/character/jump-9.png",
	];
	IMAGES_DEAD = [
		"assets/img/character/dead-1.png",
		"assets/img/character/dead-2.png",
		"assets/img/character/dead-3.png",
		"assets/img/character/dead-4.png",
		"assets/img/character/dead-5.png",
		"assets/img/character/dead-6.png",
		"assets/img/character/dead-7.png",
	];
	constructor() {
		super();
		super.loadImage("./assets/img/character/idle-1.png");
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_IDLE);
		this.loadImages(this.IMAGES_JUMPING);
		this.loadImages(this.IMAGES_DEAD);

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
			if (this.isDead()) {
				this.playAnimation(this.IMAGES_DEAD);
			} else if (this.isAboveGround()) {
				this.playAnimation(this.IMAGES_JUMPING);
			} else if (Keyboard.RIGHT || Keyboard.LEFT) {
				this.playAnimation(this.IMAGES_WALKING);
			} else {
				this.playAnimation(this.IMAGES_IDLE);
			}
		}, 100);
	}

	jump() {
		this.speedY = 30;
	}
}
