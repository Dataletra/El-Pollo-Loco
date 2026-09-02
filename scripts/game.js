import { World } from '../models/world.class.js';
import { AudioHub, MyAudio } from '../models/AudioHub.class.js';
import { Keyboard } from '../models/keyboard.class.js';
import { initLevel } from './levels/level1.js';

let canvas;
let world;
let startBtnRef;

/**
 * Grabs DOM references, hides the end screens, and calls the mobile control buttons. Runs once on script load.
 */
function init() {
	canvas = document.getElementById("canvas");
	startBtnRef = document.getElementById("start-btn");
	document.getElementById('win-screen').classList.add('d-none');
	document.getElementById('lose-screen').classList.add('d-none');
	bindOverlayButtons();
}

/**
 * Starts a new game: hides overlays, builds level, creates world,
 * and plays the intro sound + background music. Called from the Start button.
 */
function startGame() {
	document.getElementById("start-screen").classList.add("d-none");
	document.getElementById('win-screen').classList.add('d-none');
	document.getElementById('lose-screen').classList.add('d-none');
	startBtnRef.classList.add('d-none');
	initLevel();
	world = new World(canvas);
	AudioHub.playOne(AudioHub.GAME_START);
	AudioHub.playOne(AudioHub.GAME_MUSIC);
}

/**
 * Toggles global mute: when muting, stops all sounds.
 * When unmuting: plays background music. Also updates the mute button's css classes.
 */
function toggleMuteGame() {
	if (MyAudio.isMuted) {
		MyAudio.isMuted = false;
		document.getElementById('mute-btn').classList.add('red-text');
		document.getElementById('mute-btn').classList.remove('green-text');
		AudioHub.playOne(AudioHub.GAME_MUSIC);

	} else {
		document.getElementById('mute-btn').classList.add('green-text');
		document.getElementById('mute-btn').classList.remove('red-text');
		AudioHub.stopAll();
		MyAudio.isMuted = true;
	}
}

/**
 *  set the matching Keyboard booleans based on what button is pressed.
 *  Only relevant for mobile users.
 */
function bindOverlayButtons() {
	const mobileButtons = [
		{ id: 'left', property: 'LEFT' },
		{ id: 'right', property: 'RIGHT' },
		{ id: 'up', property: 'UP' },
		{ id: 'attack', property: 'SPACE' }
	];

	mobileButtons.forEach(({ id, property }) => {
		const btn = document.getElementById(id);
		btn.addEventListener('touchstart', (e) => { Keyboard[property] = true; });
		btn.addEventListener('touchend', (e) => { Keyboard[property] = false; });
	});
}

/**
 *  set the matching Keyboard booleans if key is pressed.
 */
window.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "ArrowLeft":
			Keyboard.LEFT = true;
			break;
		case "ArrowRight":
			Keyboard.RIGHT = true;
			break;
		case "ArrowUp":
			Keyboard.UP = true;
			break;
		case "ArrowDown":
			Keyboard.DOWN = true;
			break;
		case " ": // Spacebar
			Keyboard.SPACE = true;
			break;
	}
});

/**
 *  set the matching Keyboard booleans if key is lifted.
 */
window.addEventListener("keyup", (e) => {
	switch (e.key) {
		case "ArrowLeft":
			Keyboard.LEFT = false;
			break;
		case "ArrowRight":
			Keyboard.RIGHT = false;
			break;
		case "ArrowUp":
			Keyboard.UP = false;
			break;
		case "ArrowDown":
			Keyboard.DOWN = false;
			break;
		case " ":
			Keyboard.SPACE = false;
			break;
	}
});

window.startGame = startGame;
window.toggleMuteGame = toggleMuteGame;

init();
