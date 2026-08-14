class World {
	character = new Character();
	enemies = [new Chicken(), new Chicken(), new Chicken()];
	clouds = [new Cloud(), new Cloud()];
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
		this.ctx.drawImage(
			this.character.img,
			this.character.x,
			this.character.y,
			this.character.width,
			this.character.height,
		);

		this.enemies.forEach((e) => {
			this.ctx.drawImage(e.img, e.x, e.y, e.width, e.height);
		});
		this.clouds.forEach((e) => {
			this.ctx.drawImage(e.img, e.x, e.y, e.width, e.height);
		});
		let self = this;

		requestAnimationFrame(function () {
			self.draw();
		});
	}
}
