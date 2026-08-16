class Character extends MovableObject {
	height = 280;
	y = 155;
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
	currentImage = 0;
	constructor() {
		super();
		super.loadImage("./assets/img/character/idle-1.png");
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_IDLE);
		this.animate();
	}
	animate() {
		setInterval(() => {
			if (Keyboard.RIGHT) {
				this.x += this.speed + 10;
				this.otherDirection = false;
			} else if (Keyboard.LEFT) {
				this.x -= this.speed + 10;
				this.otherDirection = true;
			}
			this.world.camera_x = -this.x;
		}, 1000 / 60);

		setInterval(() => {
			if (Keyboard.RIGHT || Keyboard.LEFT) {
				console.log("TRUE");
				let i = this.currentImage % this.IMAGES_WALKING.length;
				let path = this.IMAGES_WALKING[i];
				this.img = this.imageCache[path];
				this.currentImage++;
			} else {
				let i = this.currentImage % this.IMAGES_IDLE.length;
				let path = this.IMAGES_IDLE[i];
				this.img = this.imageCache[path];
				this.currentImage++;
			}
		}, 50);
	}

	jump() {}
}
