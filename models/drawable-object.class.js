class DrawableObject {
	x = 120;
	y = 280;
	height = 150;
	width = 100;
	img;
	imageCache = {};
	currentImage = 0;

	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	draw(ctx) {
		try {
			ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		} catch (error) {
			console.warn(this.img);
			console.log(error);
		}
	}

	loadImages(arr) {
		arr.forEach((path) => {
			let img = new Image();
			img.src = path;
			this.imageCache[path] = img;
		});
	}
	drawFrame(ctx) {
		if (
			this instanceof Character ||
			this instanceof Chicken ||
			this instanceof ThrowableObject
		) {
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
