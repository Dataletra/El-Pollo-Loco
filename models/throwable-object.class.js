import { MovableObject } from './movable-object.class.js';

/**
 * A bottle thrown by the character. Affected by gravity while flying
 * horizontally in the thrown direction whilst spinning through its animation.
 * @class
 */
export class ThrowableObject extends MovableObject {
	/** Frames for the spinning animation. */
	IMAGES_SPINNING = [
		"assets/img/bottle/botella-1.png",
		"assets/img/bottle/botella-2.png",
		"assets/img/bottle/botella-3.png",
		"assets/img/bottle/botella-4.png",
	];

	/**
	 * @param {number} x - Starting x position.
	 * @param {number} y - Starting y position.
	 * @param {boolean} otherDirection - True to throw left, false to throw right.
	 */
	constructor(x, y, otherDirection) {
		super();
		this.loadImage("assets/img/bottle/botella-1.png");
		this.loadImages(this.IMAGES_SPINNING);

		this.x = x;
		this.y = y;
		this.height = 60;
		this.width = 50;
		this.otherDirection = otherDirection;
		this.throw();
		this.animate();
	}

	/**
	 * @returns {boolean} Always true; a thrown bottle is always affected by gravity.
	 */
	isAboveGround() {
		return true;
	}

	/**
	 * Launches the bottle: gives it upward speed (gravity pulls it back
	 * down) and starts its horizontal movement in the throw direction.
	 */
	throw() {
		this.speedY = 30;
		this.applyGravity();
		setInterval(() => {
			if (this.otherDirection) {
				this.x -= 10;
			} else {
				this.x += 10;
			}
		}, 25);
	}

	/**
	 * Starts the interval that cycles through the spinning animation.
	 */
	animate() {
		setInterval(() => {
			this.playAnimation(this.IMAGES_SPINNING);
		}, 100);
	}
}
