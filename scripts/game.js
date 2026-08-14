let canvas;
let world;
function init() {
	canvas = document.getElementById("canvas");
	world = new World(canvas);
	console.log(world.character);
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
