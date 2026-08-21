class Coin extends CollectableObject {
	static amount = 0;

	constructor() {
		super();
		this.x = 200 + Math.random() * 1500;
		super.loadImage("./assets/img/coin/coin-1.png");
	}
}
