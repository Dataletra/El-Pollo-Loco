export class DrawableObject {
	x = 120;
	y = 280;
	height = 150;
	width = 100;
	rX;
	rY;
	rW;
	rH;
	img;
	imageCache = {};
	currentImage = 0;
	offset = { top: 0, bottom: 0, left: 0, right: 0 };

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

	getRealFrame() {
		this.rX = this.x + this.offset.left;
		this.rY = this.y + this.offset.top;
		this.rW = this.width - this.offset.left - this.offset.right;
		this.rH = this.height - this.offset.top - this.offset.bottom;
	}

	drawFrame(ctx) {
		if (false
			// this instanceof Character ||
			// this instanceof Chicken ||
			// this instanceof ThrowableObject ||
			// this instanceof Pollito ||
			// this instanceof Endboss
		) {
			this.getRealFrame();
			ctx.beginPath();
			ctx.lineWidth = "5";
			ctx.strokeStyle = "blue";
			ctx.rect(this.rX, this.rY, this.rW, this.rH);
			ctx.stroke();
		}
	}
	isColliding(mo) {
		this.getRealFrame();
		mo.getRealFrame();
		return (this.rX + this.rW > mo.rX &&
			this.rY + this.rH > mo.rY &&
			this.rX < mo.rX + mo.rW &&
			this.rY < mo.rY + mo.rH
		);
	}
}
