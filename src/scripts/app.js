import { Clock } from 'three';

import Camera from './Camera';
import Scene from './Scene';
import Renderer from './Renderer';

import onResize from './Events/onResize';
import onKeyDown from './Events/onKeyDown';
import onKeyUp from './Events/onKeyUp';

import updateCarPosition from './updateCarPosition';

const init = () => {
	// Add state.
	window.gameState = {
		wireframe: true,
		time: 0,
		car: {
			forward: false,
			reverse: false,
			left: false,
			right: false,
		},
		camera: {
			type: 'ortogonal',
		},
	};
	window.clock = new Clock();

	Scene();
	Camera();
	Renderer();

	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onResize);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);
}

const animate = () => {
	requestAnimationFrame(animate);

	updateCarPosition();

	renderer.render(scene, camera);
};

// Setup Scene, Camera and Objects.
init();

// Start "update/display" loop.
animate();
