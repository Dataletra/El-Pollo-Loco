class Cloud extends MovableObject {
	speed = 0.15;
	y = 50;
	width = 500;
	height = 250;
	constructor() {
		super();
		super.loadImage("./assets/img/background/clouds-1.png");
		this.x = Math.random() * 2500;
		this.animate();
	}

	animate() {
		IntervalHub.startInterval(this.moveLeft, 1000 / 60);
	}

	moveLeft = () => {
		this.x -= this.speed;
	}
}
