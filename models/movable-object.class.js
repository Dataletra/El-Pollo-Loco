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
	speedY = 0;
	acceleration = 2.5;

	applyGravity() {
		setInterval(() => {
			if (this.isAboveGround() || this.speedY > 0) {
				this.y -= this.speedY;
				this.speedY -= this.acceleration;
			} else {
				this.y = 150;
				this.speedY = 0;
			}
		}, 1000 / 25);
	}

	isAboveGround() {
		return this.y < 150;
	}

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

	moveRight() {
		this.x += this.speed + 10;
		this.otherDirection = false;
	}
	moveLeft() {
		this.x -= this.speed + 10;
		this.otherDirection = true;
	}

	playAnimation(ImageArray) {
		let i = this.currentImage % ImageArray.length;
		let path = ImageArray[i];
		this.img = this.imageCache[path];
		this.currentImage++;
	}
}
