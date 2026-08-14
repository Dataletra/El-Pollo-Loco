class BackgroundObject extends MovableObject {
	x;
	y;
	width = 720;
	height = 480;
	constructor(path, x) {
		super();
		super.loadImage(path);
		this.x = x;
		this.y = 480 - this.height;
	}
}
