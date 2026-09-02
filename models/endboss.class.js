import { MovableObject } from './movable-object.class.js';
import { ImageHub } from './imageHub.class.js';
import { AudioHub } from './AudioHub.class.js';
import { IntervalHub } from '../scripts/IntervalHub.js';

/**
 * The end-of-level boss. Idles until the character gets close, plays an
 * alert intro, then moves toward the character and attacks  if the character is within range.
 * @class
 */
export class Endboss extends MovableObject {
	height = 400;
	width = 250;
	y = 55;
	speed = 0.6;
	hitPoints = 100;
	/** True once the boss has noticed the character and starts acting. */
	isAlerted = false;
	/** Distance at which the boss becomes alerted. */
	alrtDistToBoss = 600;
	/** Current horizontal distance between boss and character. */
	characterDistance = 2000;
	shouldMove = true;
	/** Distance within which the boss attacks instead of moving. */
	attackRange = 120;
	/** True while the alert intro animation is playing. */
	isAlerting = false;
	/** True once the boss has been alerted for the first time. */
	hadFirstContact = false;
	/** True once the boss has played the death sound, necessary to avoid playing the same sound when not needed. */
	deathSoundPlayed = false;
	/** True once the boss has played the Intro sound, necessary to avoid playing the same sound when not needed. */
	encounterSoundPlayed = false;
	offset = {
		top: 120,
		right: 10,
		bottom: 15,
		left: -30,
	};

	/**
	 * Note: "world" is assigned externally (not declared as a field here)
	 * once the World instance is created.
	 */
	constructor() {
		super();
		this.loadImage(ImageHub.ENDBOSS.ALERT[0]);
		this.loadImages(ImageHub.ENDBOSS.ALERT);
		this.loadImages(ImageHub.ENDBOSS.WALK);
		this.loadImages(ImageHub.ENDBOSS.HURT);
		this.loadImages(ImageHub.ENDBOSS.DEAD);
		this.loadImages(ImageHub.ENDBOSS.ATTACK);

		this.x = 2400;
		this.animate();
	};

	/**
	 * Updates characterDistance and triggers the alert intro the first
	 * time the character gets within range. Also limits the level's
	 * end_x so the character can't walk past the boss.
	 */
	checkDistanceToCharacter = () => {
		if (!this.world || !this.world.character) return;
		this.characterDistance = this.x - this.world.character.x;
		if (this.characterDistance < this.alrtDistToBoss && !this.hadFirstContact) {
			this.hadFirstContact = true;
			this.isAlerted = true;
			this.isAlerting = true;
			this.alertCounter = 0;
		}
		this.world.level.level_end_x = this.x - 90;
	};

	/**
	 * Moves the boss toward the character once alerted (and not mid-alert-intro).
	 */
	updateMovement = () => {
		if (!this.isDead() && this.isAlerted && !this.isAlerting && this.shouldMove) {
			this.x -= this.speed;
		}
	};

	/**
	 * Picks the animation/behavior for the current frame: dead, hurt,
	 * alert intro, or attack-vs-move once alerted.
	 */
	updateAnimation = () => {
		if (this.isDead()) return this.handleDeadState();
		if (this.isHurt()) return this.playAnimation(ImageHub.ENDBOSS.HURT);
		if (this.isAlerting) return this.handleAlertState();
		if (this.isAlerted) this.handleAttackOrMove();
	};

	/**
	 * Attacks if the character is within attackRange, otherwise moves towards the character.
	 */
	handleAttackOrMove() {
		if (this.characterDistance < this.attackRange) {
			this.attack();
		} else {
			this.move();
		}
	};

	/**
	 * Plays the alert animation and approach sound, then ends the intro
	 * after enough frames (12) have played.
	 */
	handleAlertState() {
		this.playAnimation(ImageHub.ENDBOSS.ALERT);
		this.shouldMove = false;
		if (!this.encounterSoundPlayed) {
			AudioHub.playOne(AudioHub.ENDBOSS_APPROACH);
			this.encounterSoundPlayed = true;
		}
		this.alertCounter++;
		if (this.alertCounter >= 12) {
			this.isAlerting = false;
		}
	};

	/**
	 * Plays the death animation and death sound once.
	 */
	handleDeadState() {
		this.playAnimation(ImageHub.ENDBOSS.DEAD);
		if (!this.deathSoundPlayed) {
			AudioHub.playOne(AudioHub.CHICKEN_DEAD);
			this.deathSoundPlayed = true;
		}
	};

	/**
	 * Starts the distance-check, movement, and animation intervals.
	 */
	animate() {
		IntervalHub.startInterval(this.checkDistanceToCharacter, 300);
		IntervalHub.startInterval(this.updateMovement, 1000 / 60);
		IntervalHub.startInterval(this.updateAnimation, 250);
	};

	/**
	 * Plays the attack animation and stops movement.
	 */
	attack() {
		this.playAnimation(ImageHub.ENDBOSS.ATTACK);
		this.shouldMove = false;
	};

	/**
	 * Plays the walk animation and continues movement.
	 */
	move() {
		this.playAnimation(ImageHub.ENDBOSS.WALK);
		this.shouldMove = true;
	};
}
