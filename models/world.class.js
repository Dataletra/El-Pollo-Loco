class World {
	character = new Character();
	level = level1;
	ctx;
	canvas;
	camera_x = 0;
	healthBar = new HealthBar();
	coinBar = new CoinBar();
	bottleBar = new BottleBar();
	coins = [];
	bottles = [];
	throwableObjects = [];
	lastThrown = 0;

	constructor(canvas) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.setWorld();
		this.draw();
		this.run();
	}

	run() {
		setInterval(() => {
			this.checkCollisions();
			this.checkThrowObjects();
		}, 50);
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
				this.character.hit();
				this.healthBar.setPercentage(this.character.hitPoints);
			}
		});
	}

	enemyVsBottle() {
		this.throwableObjects.forEach((bottle, bottleIndex) => {
			this.level.enemies.forEach((enemy) => {
				if (bottle.isColliding(enemy) && !enemy.isDead()) {
					enemy.hit();
					this.throwableObjects.splice(bottleIndex, 1);
				}
			});
		});
	}

	collectBottle() {
		this.level.bottles.forEach((bottle, index) => {
			if (this.character.isColliding(bottle)) {
				this.bottles.push(bottle);
				this.level.bottles.splice(index, 1);
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

	collectBottle() {
		this.level.bottles.forEach((bottle, index) => {
			if (this.character.isColliding(bottle)) {
				this.bottles.push(bottle);
				this.level.bottles.splice(index, 1);
				this.updateBottleBarPercentage();
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
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.translate(this.camera_x, 0);
		this.addObjectsToMap(this.level.backgroundObjects);
		this.addToMap(this.character);
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.level.bottles);
		this.addObjectsToMap(this.level.coins);
		this.addObjectsToMap(this.throwableObjects);
		this.addObjectsToMap(this.level.clouds);
		this.ctx.translate(-this.camera_x, 0);
		this.addToMap(this.healthBar);
		this.addToMap(this.coinBar);
		this.addToMap(this.bottleBar);

		let self = this;
		requestAnimationFrame(function () {
			self.draw();
		});
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
