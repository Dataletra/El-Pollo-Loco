class World {
	character = new Character();
	enemies = [new Chicken(), new Chicken(), new Chicken()];
	clouds = [new Cloud(), new Cloud()];
	backgroundObjects = [
		new BackgroundObject("assets/img/background/bgCielo-1.png", 0),
		new BackgroundObject("assets/img/background/bg3-1.png", 0),
		new BackgroundObject("assets/img/background/bg2-1.png", 0),
		new BackgroundObject("assets/img/background/bg1-1.png", 0),
	];
	ctx;
	canvas;

	constructor(canvas) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.draw();
		this.setWorld();
	}

	setWorld() {
		this.character.world = this;
	}
	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.addObjectsToMap(this.backgroundObjects);
		this.addToMap(this.character);
		this.addObjectsToMap(this.enemies);
		this.addObjectsToMap(this.clouds);

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
		this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
	}
}
