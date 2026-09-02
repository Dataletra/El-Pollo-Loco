/**
 * Global keyboard state. Each key's boolean is toggled true/false by the
 * keydown/keyup listeners in game.js and read by other classes each frame.
 * @class
 */
export class Keyboard {
	static LEFT = false;
	static RIGHT = false;
	static UP = false;
	static DOWN = false;
	static SPACE = false;
}
