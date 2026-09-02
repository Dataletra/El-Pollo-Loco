import { DrawableObject } from './drawable-object.class.js';

/**
 * Base class for items the character can pick up (coins, bottles).
 * @class
 */
export class CollectableObject extends DrawableObject {
	y = 310;

	constructor() {
		super();
	}
}
