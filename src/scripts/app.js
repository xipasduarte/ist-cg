import Game from './Game';
import detectCollision from './detectCollision';
import updateCarPosition from './updateCarPosition';
import treatCollision from './treatCollision';
import updateCheerioPosition from './updateCheerioPosition';

window.game = new Game();

const animate = () => {
	requestAnimationFrame(animate);

	scene.traverse((node) => {
		if(node.name !== 'AABB') {
			return;
		}
		node.update();
	});

	detectCollision();
	
	treatCollision();

	updateCarPosition();
	updateCheerioPosition();
	
	renderer.render(scene, camera);
};

// Setup Scene, Camera and Objects.
window.game.init();

// Start "update/display" loop.
animate();
