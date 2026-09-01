import { DrawableObject } from './drawable-object.class.js';

export class MovableObject extends DrawableObject {
	speed = 1;
	otherDirection = false;
	speedY = 0;
	acceleration = 2.5;
	hitPoints = 100;
	lastHit = 0;
	deathSoundPlayed = false;

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

	hit() {
		this.hitPoints -= 19;
		console.log(this.hitPoints);
		if (this.hitPoints < 0) {
			this.hitPoints = 0;
		} else {
			this.lastHit = new Date().getTime();
		}
	}

	isHurt() {
		let timePassed = new Date().getTime() - this.lastHit; // difference in ms
		timePassed = timePassed / 1000; // difference in s
		return timePassed < 0.5;
	}
	isDead() {
		return this.hitPoints <= 0;
	}

	isAboveGround() {
		return this.y < 150;
	}

	moveRight() {
		this.x += this.speed + 10;
		this.otherDirection = false;
	}
	moveLeft() {
		this.x -= this.speed + 10;
		this.otherDirection = true;
	}

	playAnimation(ImageArray) {
		let i = this.currentImage % ImageArray.length;
		let path = ImageArray[i];
		this.img = this.imageCache[path];
		this.currentImage++;
	}
}
