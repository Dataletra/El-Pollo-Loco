import { DrawableObject } from './drawable-object.class.js';

/**
 * Base class for drawable objects that can move, take damage, and be
 * affected by gravity (character, enemies, thrown bottles).
 * @class
 */
export class MovableObject extends DrawableObject {
	speed = 1;
	/** True when the sprite should be displayed flipped (facing left). */
	otherDirection = false;
	/** Vertical speed, used by applyGravity(). */
	speedY = 0;
	acceleration = 2.5;
	hitPoints = 100;
	/** Timestamp (ms) of the last hit taken, used by isHurt(). */
	lastHit = 0;
	deathSoundPlayed = false;

	/**
	 * Starts a gravity loop: while above ground (or still rising), applies
	 * vertical spped; otherwise snaps back to ground level.
	 */
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

	/**
	 * Reduces hit points by a fixed amount and records the hit time,
	 * limiting hit points at 0.
	 */
	hit() {
		this.hitPoints -= 20;
		if (this.hitPoints < 0) {
			this.hitPoints = 0;
		} else {
			this.lastHit = new Date().getTime();
		}
	}

	/**
	 * @returns {boolean} True if the object was hit within the last 0.5s.
	 */
	isHurt() {
		let timePassed = new Date().getTime() - this.lastHit; // difference in ms
		timePassed = timePassed / 1000; // difference in s
		return timePassed < 0.5;
	}

	/**
	 * @returns {boolean} True if hit points have reached 0 or below.
	 */
	isDead() {
		return this.hitPoints <= 0;
	}

	/**
	 * @returns {boolean} True if the object is currently airborne.
	 */
	isAboveGround() {
		return this.y < 150;
	}

	/**
	 * Moves the object right and faces it right.
	 */
	moveRight() {
		this.x += this.speed + 10;
		this.otherDirection = false;
	}

	/**
	 * Moves the object left and faces it left.
	 */
	moveLeft() {
		this.x -= this.speed + 10;
		this.otherDirection = true;
	}

	/**
	 * Draws the next frame of a given image array.
	 * @param {string[]} ImageArray - Ordered list of image paths for the animation.
	 */
	playAnimation(ImageArray) {
		let i = this.currentImage % ImageArray.length;
		let path = ImageArray[i];
		this.img = this.imageCache[path];
		this.currentImage++;
	}
}
