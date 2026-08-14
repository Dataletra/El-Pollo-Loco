class World {
	character = new Character();
	enemies = [new Chicken(), new Chicken(), new Chicken()];
	clouds = [new Cloud(), new Cloud()];
	backgroundObjects = [
		new BackgroundObject("assets/img/background/bg1-1.png", 0, 100),
	];
	ctx;
	canvas;

	constructor(canvas) {
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.draw();
		console.log(
			this.character.img,
			this.character.x,
			this.character.y,
			this.character.height,
			this.character.width,
		);
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
