import Game from './Game';
import detectCollision from './detectCollision';
import updateCarPosition from './updateCarPosition';
import updateOrangePosition from './updateOrangePosition';

window.game = new Game();

const animate = () => {
	const delta = window.clock.getDelta();

	requestAnimationFrame(animate);

	scene.traverse((node) => {
		if(node.name !== 'AABB') {
			return;
		}
		node.update();
	});

	detectCollision();
	updateCarPosition(delta);
	updateOrangePosition(delta);

	renderer.render(scene, camera);
};

// Setup Scene, Camera and Objects.
window.game.init();

// Start "update/display" loop.
animate();
