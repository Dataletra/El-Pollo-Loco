import { MovableObject } from './movable-object.class.js';
import { ImageHub } from './imageHub.class.js';
import { Keyboard } from './keyboard.class.js';
import { AudioHub } from './AudioHub.class.js';
import { IntervalHub } from '../scripts/IntervalHub.js';

/**
 * The playable character. Handles movement, animation state (idle, walk,
 * jump, hurt, dead, sleeping) and the sounds that go with each state.
 * @class
 */
export class Character extends MovableObject {
	height = 280;
	y = 150;
	/** Timestamp (ms) of the last player input, used to trigger the sleep animation. */
	lastInput = 0;
	/** Reference to the World instance, set externally. */
	world;
	deathSoundPlayed = false;
	isRunning = false;
	isSleeping = false;
	offset = {
		top: 120,
		right: 10,
		bottom: 0,
		left: 15,
	}

	constructor() {
		super();
		super.loadImage(ImageHub.PEPE.IDLE[0]);
		this.loadImages(ImageHub.PEPE.WALKING);
		this.loadImages(ImageHub.PEPE.IDLE);
		this.loadImages(ImageHub.PEPE.JUMP);
		this.loadImages(ImageHub.PEPE.HURT);
		this.loadImages(ImageHub.PEPE.DEAD);
		this.loadImages(ImageHub.PEPE.SLEEPING);

		this.applyGravity();
		this.animate();
		this.getRealFrame();
		this.lastInput = new Date().getTime();
	}

	/**
	 * Reads keyboard state and moves/jumps the character each frame,
	 * then keeps the camera and running sound in sync.
	 */
	updateMovement = () => {
		if (Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
			this.moveRight();
		} else if (Keyboard.LEFT && this.x > 0) {
			this.moveLeft();
		}
		if (Keyboard.UP && !this.isAboveGround()) {
			this.jump();
		}
		this.world.camera_x = -this.x + 100;
		this.updateWalkingSound();
	};

	/**
	 * Picks and plays the correct animation state based on the character's
	 * current situation (dead, hurt, jumping, walking, throwing, sleeping, idle).
	 */
	updateAnimation = () => {
		let now = Date.now();
		if (this.isDead()) return this.handleDeadState(now);
		if (this.isHurt()) return this.handleHurtState(now);
		if (this.isAboveGround()) return this.handleJumpState(now);
		if (Keyboard.RIGHT || Keyboard.LEFT) return this.handleWalkState(now);
		if (Keyboard.SPACE) return this.handleThrowState(now);
		if (now - this.lastInput > 5000) return this.handleSleepState();
		this.handleIdleState();
	};

	/**
	 * Plays the death animation and death sound once.
	 * @param {number} currentTime
	 */
	handleDeadState(currentTime) {
		this.stopSnoring();
		this.playAnimation(ImageHub.PEPE.DEAD);
		if (!this.deathSoundPlayed) {
			AudioHub.playOne(AudioHub.CHARACTER_DEAD);
			this.deathSoundPlayed = true;
		}
		if (Keyboard.SPACE) {
			this.lastInput = currentTime;
		}
	}

	/**
	 * Plays the hurt animation.
	 * Also resets the idle timer.
	 * @param {number} currentTime
	 */
	handleHurtState(currentTime) {
		this.stopSnoring();
		this.playAnimation(ImageHub.PEPE.HURT);
		this.lastInput = currentTime;
	}

	/**
	 * Plays the jump animation.
	 * Also resets the idle timer.
	 * @param {number} currentTime
	 */
	handleJumpState(currentTime) {
		this.stopSnoring();
		this.playAnimation(ImageHub.PEPE.JUMP);
		this.lastInput = currentTime;
	}

	/**
	 *  Plays the walking animation.
	 * 	Also resets the idle timer.
	 * @param {number} currentTime
	 */
	handleWalkState(currentTime) {
		this.stopSnoring();
		this.playAnimation(ImageHub.PEPE.WALKING);
		this.lastInput = currentTime;
	}

	/**
	 * Resets the idle timer while the character is throwing a bottle.
	 * @param {number} currentTime
	 */
	handleThrowState(currentTime) {
		this.stopSnoring();
		this.lastInput = currentTime;
	}

	/**
	 * Plays the sleeping animation and starts the looping snore sound
	 * the first time this state is entered.
	 */
	handleSleepState() {
		this.playAnimation(ImageHub.PEPE.SLEEPING);
		if (!this.isSleeping) {
			this.isSleeping = true;
			AudioHub.CHARACTER_SNORING.file.loop = true;
			AudioHub.playOne(AudioHub.CHARACTER_SNORING);
		}
	}

	/**
	 * Plays the idle animation.
	 */
	handleIdleState() {
		this.stopSnoring();
		this.playAnimation(ImageHub.PEPE.IDLE);
	}

	/**
	 * Stops the snoring sound if it is currently playing.
	 */
	stopSnoring() {
		if (this.isSleeping) {
			this.isSleeping = false;
			AudioHub.stopOne(AudioHub.CHARACTER_SNORING);
		}
	};

	/**
	 * Starts / stops the running sound based on whether the character
	 * is currently walking on the ground.
	 */
	updateWalkingSound() {
		let isMoving = (Keyboard.RIGHT || Keyboard.LEFT) && !this.isAboveGround() && !this.isDead();
		if (isMoving && !this.isRunning) {
			AudioHub.playOne(AudioHub.CHARACTER_RUN);
			this.isRunning = true;
		}
		else if (!isMoving && this.isRunning) {
			AudioHub.stopOne(AudioHub.CHARACTER_RUN);
			this.isRunning = false;
		}
	}

	/**
	 * Starts the movement and animation update intervals.
	 */
	animate() {
		IntervalHub.startInterval(this.updateMovement, 1000 / 60);
		IntervalHub.startInterval(this.updateAnimation, 100);
	}

	/**
	 * Makes the character jump and plays the jump sound.
	 */
	jump() {
		this.speedY = 30;
		AudioHub.playOne(AudioHub.CHARACTER_JUMP);
	}
}
