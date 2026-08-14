class BackgroundObject extends MovableObject {
	x;
	y;
	width = 720;
	height = 400;
	constructor(path, x, y) {
		super();
		super.loadImage(path);
		this.x = x;
		this.y = y;
	}
}
