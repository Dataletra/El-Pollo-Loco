class Chicken extends MovableObject {
	y = 360;
	height = 70;
	width = 80;
	IMAGES_WALKING = [
		"./assets/img/enemies/gallina-1.png",
		"./assets/img/enemies/gallina-2.png",
		"./assets/img/enemies/gallina-3.png",
	];
	currentImage = 0;
	constructor() {
		super();
		super.loadImage("./assets/img/enemies/gallina-1.png");
		this.x = 200 + Math.random() * 500;
		this.loadImages(this.IMAGES_WALKING);
		this.animate();
	}
	animate() {
		setInterval(() => {
			let i = this.currentImage % this.IMAGES_WALKING.length;
			let path = this.IMAGES_WALKING[i];
			this.img = this.imageCache[path];
			this.currentImage++;
		}, 100);
	}
}
