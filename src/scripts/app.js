import Game from './Game';
import detectCollision from './detectCollision';
import treatCollision from './treatCollision';
import updateCarPosition from './updateCarPosition';
import updateOrangePosition from './updateOrangePosition';
import updateCheerioPosition from './updateCheerioPosition';

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
	treatCollision();
	
	updateCarPosition(delta);
	updateOrangePosition(delta);
	updateCheerioPosition(delta);
	
	renderer.render(scene, camera);
};

// Setup Scene, Camera and Objects.
window.game.init();

// Start "update/display" loop.
animate();
