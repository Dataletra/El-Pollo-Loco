let canvas;
let world;
let startBtnRef;
function init() {
	canvas = document.getElementById("canvas");
	startBtnRef = document.getElementById("start-btn");

}
function startGame() {
	document.getElementById("start-screen").classList.add("d-none");
	initLevel();
	world = new World(canvas);
	AudioHub.playOne(AudioHub.GAME_START);
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
