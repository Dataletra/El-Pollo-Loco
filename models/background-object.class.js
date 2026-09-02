import { MovableObject } from './movable-object.class.js';

/**
 * Creates a new Background Object consiting of a sky image and several background layers
 * @class
 */
export class BackgroundObject extends MovableObject {
	x;
	y = 0;
	width = 720;
	height = 480;
	/** Shared x position for the next tile, advanced every 4 instances. */
	static xPos = -719;
	/** Counts how many tiles have been placed at the current xPos (0-3). */
	static turn = 0;

	/**
	 * @param {string} path - Path to the background image.
	 */
	constructor(path) {
		if (BackgroundObject.turn === 4) {
			BackgroundObject.xPos += 719;
			BackgroundObject.turn = 0;
		}
		super();
		super.loadImage(path);
		this.x = BackgroundObject.xPos;
		BackgroundObject.turn++;
	}

	/**
	 * Resets the static tiling counters. Call before building a new level.
	 */
	static reset() {
		BackgroundObject.xPos = -719;
		BackgroundObject.turn = 0;
	}
}
