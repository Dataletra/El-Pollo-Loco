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
	hitPoints = 100;
	lastHit = 0;
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

	hit() {
		this.hitPoints -= 5;
		console.log(this.hitPoints);
		if (this.hitPoints < 0) {
			this.hitPoints = 0;
		} else {
			this.lastHit = new Date().getTime();
		}
	}

	isHurt() {
		let timePassed = new Date().getTime() - this.lastHit; // difference in ms
		timePassed = timePassed / 1000; // difference in s
		return timePassed < 0.5;
	}
	isDead() {
		return this.hitPoints == 0;
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

	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
	drawFrame(ctx) {
		if (this instanceof Character || this instanceof Chicken) {
			ctx.beginPath();
			ctx.lineWidth = "5";
			ctx.strokeStyle = "blue";
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.stroke();
		}
	}
	isColliding(mo) {
		return (
			this.x + this.width > mo.x && // Character right edge > Enemy left edge
			this.x < mo.x + mo.width && // Character left edge < Enemy right edge
			this.y + this.height > mo.y && // Character bottom edge > Enemy top edge
			this.y < mo.y + mo.height // Character top edge < Enemy bottom edge
		);
	}
}
