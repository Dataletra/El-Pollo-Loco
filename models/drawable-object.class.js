/**
 * Base class for anything that can be drawn on the canvas. Handles image
 * loading/caching, drawing, and collision checks.
 * @class
 */
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
	/** Shrinks the collision box relative to the sprite's visual limits. */
	offset = { top: 0, bottom: 0, left: 0, right: 0 };

	/**
	 * Loads and sets a single image as the current image.
	 * @param {string} path
	 */
	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	/**
	 * Draws the current image onto the given canvas context.
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw(ctx) {
		try {
			ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		} catch (error) {
			console.warn(this.img);
			console.log(error);
		}
	}

	/**
	 * Preloads a list of images into imageCache for later use by playAnimation().
	 * @param {string[]} arr - Image paths.
	 */
	loadImages(arr) {
		arr.forEach((path) => {
			let img = new Image();
			img.src = path;
			this.imageCache[path] = img;
		});
	}

	/**
	 * Recalculates the offset-adjusted collision box (rX, rY, rW, rH)
	 * from the current x/y/width/height and offset.
	 */
	getRealFrame() {
		this.rX = this.x + this.offset.left;
		this.rY = this.y + this.offset.top;
		this.rW = this.width - this.offset.left - this.offset.right;
		this.rH = this.height - this.offset.top - this.offset.bottom;
	}

	/**
	 * Draws the collision box outline for debugging. Disabled by default.
	 * to enable: remove comments (//) within the if statement
	 * @param {CanvasRenderingContext2D} ctx
	 */
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

	/**
	 * Checks if this object's collision box overlaps another's.
	 * @param {DrawableObject} mo - The other object to test against.
	 * @returns {boolean} True if the boxes overlap.
	 */
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
