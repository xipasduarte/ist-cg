import Camera from './Camera';
import Scene from './Scene';
import Renderer from './Renderer';

import onResize from './Events/onResize';
import onKeyDown from './Events/onKeyDown';


const gameState = {
	time: null,
	car: {
		isMoving: false,
		reverse: false,
	}
};

const init = () => {
	// Add state.
	window.gameState = {
		wireframe: true,
	}

	Scene();
	Camera();
	Renderer();

	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onResize);
	window.addEventListener('keydown', onKeyDown);
}

const animate = () => {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
};

// Setup Scene, Camera and Objects.
init();

// Start "update/display" loop.
animate();
