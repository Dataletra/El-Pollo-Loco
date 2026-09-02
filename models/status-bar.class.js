import { DrawableObject } from './drawable-object.class.js';

/**
 * Base class for HUD progress bars (health, coins, bottles, boss health).
 * Displays one of 6 preloaded images depending on the current percentage.
 * @class
 */
export class StatusBar extends DrawableObject {
	percentage = 100;
	/** The 6 images used, ordered from full (0) to empty (5). */
	IMAGES = [];

	/**
	 * @param {string[]} images - 6 image paths, full-to-empty.
	 * @param {number} [x=10] - X position on screen.
	 * @param {number} [y=0] - Y position on screen.
	 */
	constructor(images, x = 10, y = 0) {
		super();
		this.IMAGES = images;
		this.x = x;
		this.y = y;
		this.width = 200;
		this.height = 60;
		this.loadImages(this.IMAGES);
		this.setPercentage(100);
	}

	/**
	 * Updates the percentage and swaps to the matching image.
	 * @param {number} percentage - Value from 0 to 100.
	 */
	setPercentage(percentage) {
		this.percentage = percentage;
		let path = this.IMAGES[this.resolveImageIndex()];
		this.img = this.imageCache[path];
	}

	/**
	 * Returns the desired image Index based on percentage.
	 * @returns {number}
	 */
	resolveImageIndex() {
		if (this.percentage >= 100) return 0;
		if (this.percentage > 80) return 1;
		if (this.percentage > 60) return 2;
		if (this.percentage > 40) return 3;
		if (this.percentage > 20) return 4;
		return 5;
	}
}
