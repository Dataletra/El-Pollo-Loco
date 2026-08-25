class World {
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
				!enemy.isDead()
			) {
				enemy.hit();
			} else if (this.character.isColliding(enemy) && !enemy.isDead()) {
				let currentTime = new Date().getTime();
				let timePassed = currentTime - (this.lastHit || 0);

				if (timePassed > 1000) {
					this.character.hit();
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


	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.translate(this.camera_x, 0);
		this.addObjectsToMap(this.level.backgroundObjects);
		this.addEntities();
		this.addObjectsToMap(this.level.clouds);
		//this.renderEgg();
		this.ctx.translate(-this.camera_x, 0);
		this.addHudElements();
		requestAnimationFrame(() => this.draw());
	}

	// renderEgg() {
	// 	if (this.endboss.attack()) {
	// 		let egg = new Egg();
	// 		let eggs = [];
	// 		eggs.push(egg);
	// 		this.addObjectsToMap(eggs);
	// 	}
	// }

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
}
