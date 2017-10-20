import { Mesh } from 'three';

import Camera from './../Camera';

export default (e) => {
  const car = window.scene.getObjectByName('car');
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
      car.left = true;
      break;
    case 38: // Top arrow
      car.forward = true;
      break;
    case 39: // Right
      car.right = true;
      break;
    case 40: // Down arrow
      car.reverse = true;
      break;
    case 49: // 1
      Camera('orthogonal');
      break;
    case 50: // 2
      Camera('perspective');
      break;
    case 51: // 3
      Camera('thirdPerson');
      break;
  }
}
