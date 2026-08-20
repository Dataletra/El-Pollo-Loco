class CollectableObject extends DrawableObject {
	amount = 0;
	y = 310;
	constructor() {
		super();
		this.x = 200 + Math.random() * 1500;
		super.loadImage("./assets/img/coin/coin-1.png");
	}
}
