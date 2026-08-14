class Character extends MovableObject {
	height = 280;
	y = 155;
	IMAGES_WALKING = [
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
		this.animate();
	}
	animate() {
		setInterval(() => {
			let i = this.currentImage % this.IMAGES_WALKING.length;
			let path = this.IMAGES_WALKING[i];
			this.img = this.imageCache[path];
			this.currentImage++;
		}, 200);
	}

	jump() {}
}
