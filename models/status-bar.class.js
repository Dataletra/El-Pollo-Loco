class StatusBar extends DrawableObject {
	IMAGES = [
		"assets/img/bars/life-bar-1.png",
		"assets/img/bars/life-bar-2.png",
		"assets/img/bars/life-bar-3.png",
		"assets/img/bars/life-bar-4.png",
		"assets/img/bars/life-bar-5.png",
		"assets/img/bars/life-bar-6.png",
	];

	percentage = 100;

	constructor() {
		super();
		this.x = 10;
		this.y = 0;
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
