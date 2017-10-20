import { PerspectiveCamera, OrthographicCamera } from 'three';

const ortogonal = (x, y, z, lookAt) => {
  const camera = new OrthographicCamera(window.innerWidth / - 10, window.innerWidth / 10, window.innerHeight / 10, window.innerHeight / - 10, 1, 200);
  camera.position.set(x, y, z);
  camera.lookAt(lookAt);
  camera.name = 'camera';
  return camera;
};

const perspective = (x, y, z, lookAt) => {
  const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(x, y, z);
  camera.lookAt(lookAt);
  camera.name = 'camera';
  return camera;
};

export default () => {
  const car = window.scene.getObjectByName('car');
  const existingCameras = window.scene.getObjectByName('camera');
  let camera;

  car.remove(existingCameras);

  switch (gameState.camera.type) {
    case 'ortogonal':
      camera = ortogonal(0, 10, 0, scene.position);
      break;
    case 'thirdPerson':
      camera = perspective(0, 30, -30, car.position);
      car.add(camera);
      break;
    default:
      camera = perspective(75, 75, 75, scene.position);
      break;
  }

  window.camera = camera;
};
