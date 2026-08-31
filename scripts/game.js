let canvas;
let world;
let startBtnRef;

function init() {
	canvas = document.getElementById("canvas");
	startBtnRef = document.getElementById("start-btn");
	document.getElementById('win-screen').classList.add('d-none');
	document.getElementById('lose-screen').classList.add('d-none');

	bindOverlayButtons();
}

function startGame() {
	document.getElementById("start-screen").classList.add("d-none");
	document.getElementById('win-screen').classList.add('d-none');
	document.getElementById('lose-screen').classList.add('d-none');
	startBtnRef.classList.add('d-none');
	initLevel();
	world = new World(canvas);
	AudioHub.playOne(AudioHub.GAME_START);
}

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
		btn.addEventListener('touchstart', (e) => { e.preventDefault(); Keyboard[property] = true; });
		btn.addEventListener('touchend', (e) => { e.preventDefault(); Keyboard[property] = false; });
	});
}

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

init();