class MovableObject {
	x = 120;
	y = 280;
	height = 150;
	width = 100;
	speed = 0.15;
	img;
	imageCache = {};
	otherDirection = false;
	currentImage = 0;

	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	loadImages(arr) {
		arr.forEach((path) => {
			let img = new Image();
			img.src = path;
			this.imageCache[path] = img;
		});
	}

	moveRight() {}
	moveLeft() {
		setInterval(() => {
			this.x -= this.speed;
		}, 1000 / 60);
	}

	playAnimation(ImageArray) {
		let i = this.currentImage % ImageArray.length;
		let path = ImageArray[i];
		this.img = this.imageCache[path];
		this.currentImage++;
	}
}
