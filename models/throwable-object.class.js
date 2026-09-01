import { MovableObject } from './movable-object.class.js';

export class ThrowableObject extends MovableObject {
	IMAGES_SPINNING = [
		"assets/img/bottle/botella-1.png",
		"assets/img/bottle/botella-2.png",
		"assets/img/bottle/botella-3.png",
		"assets/img/bottle/botella-4.png",
	];

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

	// A thrown bottle is always treated as "above ground" (falls under gravity),
	// regardless of its y position. Previously handled via an instanceof check
	// in MovableObject; moved here to avoid a circular import.
	isAboveGround() {
		return true;
	}

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

	animate() {
		setInterval(() => {
			this.playAnimation(this.IMAGES_SPINNING);
		}, 100);
	}
}
