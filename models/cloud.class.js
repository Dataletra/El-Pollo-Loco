import { MovableObject } from './movable-object.class.js';
import { IntervalHub } from '../scripts/IntervalHub.js';

/**
 * A background cloud that drifts slowly to the left. Spawns at a random x position.
 * @class
 */
export class Cloud extends MovableObject {
	speed = 0.15;
	y = 50;
	width = 500;
	height = 250;

	constructor() {
		super();
		super.loadImage("./assets/img/background/clouds-1.png");
		this.x = Math.random() * 2500;
		this.animate();
	}

	/**
	 * Starts the interval that moves the cloud left.
	 */
	animate() {
		IntervalHub.startInterval(this.moveLeft, 1000 / 60);
	}

	/**
	 * Shifts the cloud one step to the left.
	 */
	moveLeft = () => {
		this.x -= this.speed;
	}
}
