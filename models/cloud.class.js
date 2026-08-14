class Cloud extends MovableObject {
	y = 50;
	width = 500;
	height = 250;
	constructor() {
		super();
		super.loadImage("./assets/img/background/clouds-1.png");
		this.x = Math.random() * 700;
		this.animate();
	}
	animate() {
		this.moveLeft();
	}
}
