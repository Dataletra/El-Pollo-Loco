import { Character } from './character.class.js';
import { HealthBar } from './health-bar.class.js';
import { CoinBar } from './coin-bar.class.js';
import { BottleBar } from './bottle-bar.class.js';
import { BossBar } from './boss-bar.class.js';
import { Endboss } from './endboss.class.js';
import { ThrowableObject } from './throwable-object.class.js';
import { AudioHub } from './AudioHub.class.js';
import { Keyboard } from './keyboard.class.js';
import { IntervalHub } from '../scripts/IntervalHub.js';
import { level1 } from '../scripts/levels/level1.js';

/**
 * The main game world. Owns canvas, character, HUD bars,
 * current level and drives the render loop, collision checks, and
 * win/lose detection.
 */
export class World {
	character = new Character();
	healthBar = new HealthBar();
	coinBar = new CoinBar();
	bottleBar = new BottleBar();
	bossBar = new BossBar();
	level = level1;
	/** The Endboss instance, always the last enemy in the level. */
	endboss = this.level.enemies[this.level.enemies.length - 1];
	ctx;
	canvas;
	/** Horizontal camera offset applied for the character. */
	camera_x = 0;
	/** Coins collected by the character. */
	coins = [];
	/** Bottles collected by the character. */
	bottles = [];
	/** Bottles currently in flight. */
	throwableObjects = [];
	/** Timestamp (ms) of the last bottle thrown, for throw cooldown. */
	lastThrown = 0;
	/** Timestamp (ms) of the last time the character was hit, for hit cooldown. */
	lastHit = 0;
	/** True once the boss bar has been shown for the first time. */
	bossEncountered = false;
	gameOver = false;

	/**
	 * @param {HTMLCanvasElement} canvas
	 */
	constructor(canvas) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.setWorld();
		this.draw();
		this.run();
		IntervalHub.startInterval(this.run, 50);
	}

	/**
	 * Collisions, bottle throwing, and game-over checks.
	 */
	run = () => {
		this.checkCollisions();
		this.checkThrowObjects();
		this.checkGameOver();
	}

	/**
	 * Throws a new bottle when SPACE is pressed, the throw cooldown has
	 * elapsed, and the character has bottles left.
	 */
	checkThrowObjects() {
		let currentTime = new Date().getTime();
		let timePassed = currentTime - this.lastThrown;
		if (Keyboard.SPACE && timePassed > 1000 && this.bottles.length > 0) {
			let offsetX = this.character.otherDirection ? -30 : 70;
			let bottle = new ThrowableObject(
				this.character.x + offsetX,
				this.character.y + 100,
				this.character.otherDirection,
			);
			this.throwableObjects.push(bottle);
			this.lastThrown = currentTime;
			this.bottles.length--;
			this.updateBottleBarPercentage();
		}
	}
	// #region Collisions

	/**
	 * Runs all collision checks.
	 */
	checkCollisions() {
		this.enemyVsCharacter();
		this.enemyVsBottle();
		this.collectBottle();
		this.collectCoin();
	}

	/**
	 * Handles character-vs-enemy collisions: a jump-stomp kills non-boss
	 * enemies, while any other contact calls handleCharacterHit().
	 */
	enemyVsCharacter() {
		this.level.enemies.forEach((enemy) => {
			if (!this.character.isColliding(enemy) || enemy.isDead()) return;
			const isJumpOnEnemy = this.character.speedY < 0 && !(enemy instanceof Endboss);
			if (isJumpOnEnemy) {
				enemy.hit();
			} else if (Date.now() - (this.lastHit || 0) > 1000) {
				this.handleCharacterHit();
			}
		});
	}

	/**
	 * Handles hit logic for the player, plays hit sound, sets hit cooldown timer
	 */
	handleCharacterHit() {
		this.character.hit();
		AudioHub.playOne(AudioHub.CHARACTER_DAMAGE);
		this.healthBar.setPercentage(this.character.hitPoints);
		this.lastHit = Date.now();
	}

	/**
	 * Handles bottle-vs-enemy collisions: damages the enemy, plays
	 * the break sound, removes the bottle, updates the boss bar.
	 */
	enemyVsBottle() {
		this.throwableObjects.forEach((bottle, bottleIndex) => {
			this.level.enemies.forEach((enemy) => {
				if (bottle.isColliding(enemy) && !enemy.isDead()) {
					enemy.hit();
					AudioHub.playOne(AudioHub.BOTTLE_BREAK);
					this.throwableObjects.splice(bottleIndex, 1);
					this.bossBar.setPercentage(this.endboss.hitPoints);
				}
			});
		});
	}

	/**
	 * Picks up any level bottle the character touches: moves it into
	 * character's inventory, updates bottle bar, plays collect sound.
	 */
	collectBottle() {
		this.level.bottles.forEach((bottle, index) => {
			if (this.character.isColliding(bottle)) {
				this.bottles.push(bottle);
				this.level.bottles.splice(index, 1);
				this.updateBottleBarPercentage();
				AudioHub.playOne(AudioHub.BOTTLE_COLLECT_SOUND);
			}
		});
	}

	/**
	 * Picks up any level coin the character touches: moves it into
	 * character's inventory, updates coin bar, plays the collect sound.
	 */
	collectCoin() {
		this.level.coins.forEach((coin, index) => {
			if (this.character.isColliding(coin)) {
				this.coins.push(coin);
				this.level.coins.splice(index, 1);
				let coinPercentage = (this.coins.length / 10) * 100;
				this.coinBar.setPercentage(coinPercentage);
				AudioHub.playOne(AudioHub.COLLECT_SOUND);
			}
		});
	}

	/**
	 * Calculates the bottle bar percentage from the current
	 * bottle inventory (out of a max of 10).
	 */
	updateBottleBarPercentage() {
		let bottlePercentage = (this.bottles.length / 10) * 100;
		this.bottleBar.setPercentage(bottlePercentage);
	}

	/**
	 * Applies this World onto the character and the boss so they can
	 * reference it (position, level bounds, etc.).
	 */
	setWorld() {
		this.character.world = this;
		let boss = this.level.enemies.find(e => e instanceof Endboss);
		if (boss) boss.world = this;
	}
	// #endregion
	// #region add Objects
	/**
	 * Renders one full frame: background, entities, HUD, then schedules
	 * the next frame via requestAnimationFrame.
	 */
	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.translate(this.camera_x, 0);
		this.addObjectsToMap(this.level.backgroundObjects);
		this.addObjectsToMap(this.level.clouds);
		this.addEntities();
		this.ctx.translate(-this.camera_x, 0);
		this.addHudElements();
		requestAnimationFrame(() => this.draw());
	}

	/**
	 * Draws the character, enemies, collectables, and fyling bottles.
	 */
	addEntities() {
		this.addToMap(this.character);
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.level.bottles);
		this.addObjectsToMap(this.level.coins);
		this.addObjectsToMap(this.throwableObjects);
	}

	/**
	 * Draws HUD bars, showing the boss bar once the boss has
	 * been encountered.
	 */
	addHudElements() {
		this.addToMap(this.healthBar);
		this.addToMap(this.coinBar);
		this.addToMap(this.bottleBar);
		if (this.endboss.characterDistance < 500 || this.bossEncountered) {
			this.bossEncountered = true;
			this.addToMap(this.bossBar);
		}
	}

	/**
	 * Makes a list of drawable objects.
	 * @param {object[]} objects
	 */
	addObjectsToMap(objects) {
		objects.forEach((o) => {
			this.addToMap(o);
		});
	}

	/**
	 * Draws a single object, flipping it horizontally first if it's
	 * facing the other direction.
	 * @param {object} mo
	 */
	addToMap(mo) {
		if (mo.otherDirection) {
			this.flipImage(mo);
		}
		mo.draw(this.ctx);
		mo.drawFrame(this.ctx);
		if (mo.otherDirection) {
			this.flipImageBack(mo);
		}
	}

	/**
	 * Applies a horizontal flip to the canvas for drawing a
	 * left-facing object.
	 * @param {object} mo
	 */
	flipImage(mo) {
		this.ctx.save();
		this.ctx.translate(mo.width, 0);
		this.ctx.scale(-1, 1);
		mo.x = mo.x * -1;
	}

	/**
	 * Reverts the flip transform applied by flipImage().
	 * @param {object} mo
	 */
	flipImageBack(mo) {
		mo.x = mo.x * -1;
		this.ctx.restore();
	}
	//# endregion
	// #region End Game logic
	/**
	 * Checks for a win or loss condition and triggers game over handling.
	 */
	checkGameOver() {
		if (this.gameOver) return;
		if (this.checkYouLose()) {
			this.handleGameOver(false);
		} else if (this.checkYouWin()) {
			this.handleGameOver(true);
		}
	}

	/**
	 * @returns {boolean} True if the character died.
	 */
	checkYouLose() {
		return this.character.isDead();
	}

	/**
	 * @returns {boolean} True if the end boss died.
	 */
	checkYouWin() {
		return this.endboss.isDead();
	}

	/**
	 * Stops the game and after a short delay stops all intervals/sounds and shows the win or lose screen.
	 * @param {boolean} hasWon
	 */
	handleGameOver(hasWon) {
		if (this.gameOver) return;
		this.gameOver = true;
		setTimeout(() => {
			IntervalHub.stopAllIntervals();
			AudioHub.stopAll();
			this.showEndScreen(hasWon);
		}, 1200);//1.2s for sounds / animations to play out
	}

	/**
	 * Reveals the win or lose screen overlay.
	 * @param {boolean} result - True for win, false for lose.
	 */
	showEndScreen(result) {
		if (result) {
			document.getElementById('win-screen').classList.remove('d-none');
		} else {
			document.getElementById('lose-screen').classList.remove('d-none');
		}
	}
	// #endregion
}
