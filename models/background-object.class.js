import { MovableObject } from './movable-object.class.js';

export class BackgroundObject extends MovableObject {
	x;
	y = 0;
	width = 720;
	height = 480;
	static xPos = -719;
	static turn = 0;
	constructor(path) {
		if (BackgroundObject.turn === 4) {
			BackgroundObject.xPos += 719;
			BackgroundObject.turn = 0;
		}
		super();
		super.loadImage(path);
		this.x = BackgroundObject.xPos;
		BackgroundObject.turn++;
	}
	static reset() {
		BackgroundObject.xPos = -719;
		BackgroundObject.turn = 0;
	}
}
