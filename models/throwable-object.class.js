class ThrowableObject extends MovableObject {
	constructor(x, y) {
		super().loadImage("assets/img/bottle/botella-1.png");
		this.x = x;
		this.y = y;
		this.height = 60;
		this.width = 50;
		this.throw(x, y);
	}
	throw(x, y) {
		this.x = x;
		this.y = y;
		this.speedY = 30;
		this.applyGravity();
		setInterval(() => {
			this.x += 10;
		}, 25);
	}
}
