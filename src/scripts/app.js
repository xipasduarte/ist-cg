import Game from './Game';
import detectCollision from './detectCollision';
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
	Camera('orthogonal');
	Renderer();

	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onResize);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);
}

const animate = () => {
	requestAnimationFrame(animate);

	scene.traverse((node) => {
		if(node.name !== 'AABB') {
			return;
		}
		node.update();
	});

	detectCollision();
	updateCarPosition();

	renderer.render(scene, camera);
};

// Setup Scene, Camera and Objects.
window.game.init();

// Start "update/display" loop.
animate();
