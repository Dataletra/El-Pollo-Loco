import { MovableObject } from './movable-object.class.js';
import { ImageHub } from './imageHub.class.js';
import { AudioHub } from './AudioHub.class.js';
import { IntervalHub } from '../scripts/IntervalHub.js';

/**
 * A smaller enemy variant of the chicken. Moves left
 * continuously until killed, then plays its death animation and sound once.
 * @class
 */
export class Pollito extends MovableObject {
	y = 390;
	height = 40;
	width = 60;
	hitPoints = 1;
	currentImage = 0;

	constructor() {
		super();
		super.loadImage(ImageHub.POLLITO.WALKING[0]);
		this.x = 500 + Math.random() * 1200;
		this.speed = 0.15 + Math.random() * 0.5;
		this.loadImages(ImageHub.POLLITO.WALKING);
		this.loadImages(ImageHub.POLLITO.DEAD);
		this.animate();
	}

	/**
	 * Moves the chicken left each frame while it's alive.
	 */
	updateMovement = () => {
		if (!this.isDead()) {
			this.x -= this.speed;
		}
	};

	/**
	 * Plays the walking animation, or the death animation and sound
	 * (once) once the chicken has been killed.
	 */
	updateAnimation = () => {
		if (this.isDead()) {
			this.playAnimation(ImageHub.POLLITO.DEAD);
			if (!this.deathSoundPlayed) {
				AudioHub.playOne(AudioHub.CHICKEN_DEAD_2);
				this.deathSoundPlayed = true;
			}
		} else {
			this.playAnimation(ImageHub.POLLITO.WALKING);
		}
	};

	/**
	 * Starts the movement and animation update intervals.
	 */
	animate() {
		IntervalHub.startInterval(this.updateMovement, 1000 / 60);
		IntervalHub.startInterval(this.updateAnimation, 100);
	}
}
