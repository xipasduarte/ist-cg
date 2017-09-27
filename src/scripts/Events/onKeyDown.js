import { Mesh } from 'three';

export default (e) => {
  switch(e.keyCode) {
    case 65:
      window.scene.traverse((node) => {
        if (node instanceof Mesh) {
          node.material.wireframe = !node.material.wireframe;
        }
      });
      break;
    // case: 37 // Left arrow
    case 38: // Top arrow
      gameState.car.isMoving = true;
      break;
    // case: 39 // Right arrow
    case 40: // Down arrow
      gameState.car.isMoving = true;
      gameState.car.reverse = true;
      break;
  }
}
