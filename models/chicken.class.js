class Chicken extends MovableObject {
	y = 360;
	height = 70;
	width = 80;
	constructor() {
		super();
		super.loadImage("./assets/img/enemies/gallina-1.png");
		this.x = 200 + Math.random() * 500;
	}
}
