import { World } from '../models/world.class.js';
import { AudioHub, MyAudio } from '../models/AudioHub.class.js';
import { Keyboard } from '../models/keyboard.class.js';
import { initLevel } from './levels/level1.js';

let canvas;
let world;
let startBtnRef;

/**
 * Grabs DOM references, hides the end screens, and calls the mobile control buttons. Runs once on script load.
 * Also updates MyAudio.isMuted static boolean based on local storage for persistence 
 */
function init() {
	canvas = document.getElementById("canvas");
	startBtnRef = document.getElementById("start-btn");
	document.getElementById('win-screen').classList.add('d-none');
	document.getElementById('lose-screen').classList.add('d-none');
	bindOverlayButtons();
	MyAudio.isMuted = localStorage.getItem('isMuted') === 'true';
	updateMuteUI();
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

function mainMenu() {
	document.getElementById('win-screen').classList.add('d-none');
	document.getElementById('lose-screen').classList.add('d-none');
	document.getElementById("start-screen").classList.remove("d-none");
	startBtnRef.classList.remove('d-none');
	AudioHub.stopAll();

}

/**
 * Toggles global mute: when muting, stops all sounds.
 * When unmuting: plays background music.
 * Also updates local storage
 */
function toggleMuteGame() {
	MyAudio.isMuted = !MyAudio.isMuted;
	localStorage.setItem('isMuted', MyAudio.isMuted);
	updateMuteUI();

	if (MyAudio.isMuted) {
		AudioHub.stopAll();
	} else if (world?.gameOver === false) {
		AudioHub.playOne(AudioHub.GAME_MUSIC);
	}
}
/**
 * Updates the UI based on MyAudios.isMuted static boolean
 */
function updateMuteUI() {
	const isMuted = MyAudio.isMuted;
	const btn = document.getElementById('mute-btn');
	if (btn) {
		btn.classList.toggle('green-text', isMuted);
		btn.classList.toggle('red-text', !isMuted);
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
		if (!btn) return;

		const handleTouch = (e, state) => {
			if (e.cancelable) e.preventDefault();
			Keyboard[property] = state;
		};

		btn.addEventListener('touchstart', (e) => handleTouch(e, true), { passive: false });
		btn.addEventListener('touchend', (e) => handleTouch(e, false), { passive: false });
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
window.mainMenu = mainMenu;

init();
