class Chicken extends MovableObject {
	constructor() {
		super();
		super.loadImage("./assets/img/enemies/gallina-1.png");
		this.x = 200 + Math.random() * 500;
	}
}
