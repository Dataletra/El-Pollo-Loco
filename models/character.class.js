class Character extends MovableObject {
	height = 280;
	y = 55;
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
	constructor() {
		super();
		super.loadImage("./assets/img/character/idle-1.png");
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_IDLE);
		this.loadImages(this.IMAGES_JUMPING);

		this.applyGravity();
		this.animate();
	}
	animate() {
		setInterval(() => {
			if (Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
				this.x += this.speed + 10;
				this.otherDirection = false;
			} else if (Keyboard.LEFT && this.x > 0) {
				this.x -= this.speed + 10;
				this.otherDirection = true;
			}
			this.world.camera_x = -this.x + 100;
		}, 1000 / 60);

		setInterval(() => {
			if (Keyboard.RIGHT || Keyboard.LEFT) {
				console.log("TRUE");
				this.playAnimation(this.IMAGES_WALKING);
			} else {
				this.playAnimation(this.IMAGES_IDLE);
			}
			if (this.isAboveGround()) {
				this.playAnimation(this.IMAGES_JUMPING);
			}
		}, 50);
	}

	jump() {}
}
