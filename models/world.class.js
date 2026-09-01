import { Character } from './character.class.js';
import { HealthBar } from './health-bar.class.js';
import { CoinBar } from './coin-bar.class.js';
import { BottleBar } from './bottle-bar.class.js';
import { BossBar } from './boss-bar-class.js';
import { Endboss } from './endboss.class.js';
import { ThrowableObject } from './throwable-object.class.js';
import { AudioHub } from './AudioHub.class.js';
import { Keyboard } from './keyboard.class.js';
import { IntervalHub } from '../scripts/IntervalHub.js';
import { level1 } from '../scripts/levels/level1.js';

export class World {
	character = new Character();
	healthBar = new HealthBar();
	coinBar = new CoinBar();
	bottleBar = new BottleBar();
	bossBar = new BossBar();
	level = level1;
	endboss = this.level.enemies[this.level.enemies.length - 1];
	ctx;
	canvas;
	camera_x = 0;
	coins = [];
	bottles = [];
	throwableObjects = [];
	lastThrown = 0;
	lastHit = 0;
	bossEncountered = false;
	gameOver = false;

	constructor(canvas) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.setWorld();
		this.draw();
		this.run();
		IntervalHub.startInterval(this.run, 50);
	}

	run = () => {
		this.checkCollisions();
		this.checkThrowObjects();
		this.checkGameOver();
	}

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

	checkCollisions() {
		this.enemyVsCharacter();
		this.enemyVsBottle();
		this.collectBottle();
		this.collectCoin();
	}

	enemyVsCharacter() {
		this.level.enemies.forEach((enemy) => {
			if (
				this.character.isColliding(enemy) &&
				this.character.speedY < 0 &&
				!enemy.isDead() &&
				!(enemy instanceof Endboss)
			) {
				enemy.hit();
			} else if (this.character.isColliding(enemy) && !enemy.isDead()) {
				let currentTime = new Date().getTime();
				let timePassed = currentTime - (this.lastHit || 0);

				if (timePassed > 1000) {
					this.character.hit();
					AudioHub.playOne(AudioHub.CHARACTER_DAMAGE);
					this.healthBar.setPercentage(this.character.hitPoints);
					this.lastHit = currentTime;
				}
			}
		});
	}

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

	updateBottleBarPercentage() {
		let bottlePercentage = (this.bottles.length / 10) * 100;
		console.log("this.bottles.length: ", this.bottles.length);
		this.bottleBar.setPercentage(bottlePercentage);
	}

	setWorld() {
		this.character.world = this;
		let boss = this.level.enemies.find(e => e instanceof Endboss);
		if (boss) boss.world = this;
	}
	// #endregion
	// #region add Objects
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

	addEntities() {
		this.addToMap(this.character);
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.level.bottles);
		this.addObjectsToMap(this.level.coins);
		this.addObjectsToMap(this.throwableObjects);
	}

	addHudElements() {
		this.addToMap(this.healthBar);
		this.addToMap(this.coinBar);
		this.addToMap(this.bottleBar);
		if (this.endboss.characterDistance < 500 || this.bossEncountered) {
			this.bossEncountered = true;
			this.addToMap(this.bossBar);
		}
	}

	addObjectsToMap(objects) {
		objects.forEach((o) => {
			this.addToMap(o);
		});
	}

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

	flipImage(mo) {
		this.ctx.save();
		this.ctx.translate(mo.width, 0);
		this.ctx.scale(-1, 1);
		mo.x = mo.x * -1;
	}
	flipImageBack(mo) {
		mo.x = mo.x * -1;
		this.ctx.restore();
	}
	//# endregion
	// #region End Game logic
	checkGameOver() {
		if (this.gameOver) return;
		if (this.checkYouLose()) {
			this.handleGameOver(false);
		} else if (this.checkYouWin()) {
			this.handleGameOver(true);
		}
	}

	checkYouLose() {
		return this.character.isDead();
	}

	checkYouWin() {
		return this.endboss.isDead();
	}

	handleGameOver(hasWon) {
		if (this.gameOver) return;
		this.gameOver = true;
		setTimeout(() => {
			IntervalHub.stopAllIntervals();
			AudioHub.stopAll();
			this.showEndScreen(hasWon);
		}, 1200);//1.2s for sounds / animations to play out
	}

	showEndScreen(result) {
		if (result) {
			document.getElementById('win-screen').classList.remove('d-none');
		} else {
			document.getElementById('lose-screen').classList.remove('d-none');
		}
	}
	// #endregion
}
