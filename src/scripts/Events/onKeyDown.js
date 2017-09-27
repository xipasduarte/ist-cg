import { Mesh } from 'three';

export default (e) => {
  switch(e.keyCode) {
    case 65:
      scene.traverseVisible((node) => {
        if (node instanceof Mesh) {
          node.material.wireframe = !node.material.wireframe;
        }
      });
      break;
    case 37: // Left arrow
      gameState.car.left = true;
      break;
    case 38: // Top arrow
      gameState.car.forward = true;
      break;
    case 39: // Right
      gameState.car.right = true;
      break;
    case 40: // Down arrow
      gameState.car.reverse = true;
      break;
  }
}
