import { Mesh } from 'three';

import Camera from './../Camera';

export default (e) => {
  switch(e.keyCode) {
    case 65:
      scene.traverseVisible((node) => {
        if (node instanceof Mesh) {
          if (node.name === 'rim') {
            return;
          }
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
    case 73: // i
      gameState.camera.type = 'perspective';
      Camera();
      break;
    case 79: // o
      gameState.camera.type = 'ortogonal';
      Camera();
      break;
    case 80: // p
      gameState.camera.type = 'thirdPerson';
      Camera();
      break;
  }
}
