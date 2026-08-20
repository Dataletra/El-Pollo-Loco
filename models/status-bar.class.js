class StatusBar extends DrawableObject {
	percentage = 100;
	IMAGES = [];

	constructor(images, x = 10, y = 0) {
		super();
		this.IMAGES = images;
		this.x = x;
		this.y = y;
		this.width = 200;
		this.height = 60;
		this.loadImages(this.IMAGES);
		this.setPercentage(100);
	}

	setPercentage(percentage) {
		this.percentage = percentage;
		let path = this.IMAGES[this.resolveImageIndex()];
		this.img = this.imageCache[path];
	}

	resolveImageIndex() {
		if (this.percentage >= 100) {
			return 0;
		} else if (this.percentage > 80) {
			return 1;
		} else if (this.percentage > 60) {
			return 2;
		} else if (this.percentage > 40) {
			return 3;
		} else if (this.percentage > 20) {
			return 4;
		} else {
			return 5;
		}
	}
}
