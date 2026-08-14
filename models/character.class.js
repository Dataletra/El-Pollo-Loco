class Character extends MovableObject {
	height = 280;
	y = 155;
	constructor() {
		super();
		super.loadImage("./assets/img/character/idle-1.png");
	}
	jump() {}
}
