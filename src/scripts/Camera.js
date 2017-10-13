import { PerspectiveCamera, OrthographicCamera, Vector3 } from 'three';

const orthogonal = (x, y, z, lookAt) => {
  const camera = new OrthographicCamera(-window.innerWidth / 12, window.innerWidth / 12, window.innerHeight / 12, -window.innerHeight / 12, 1, 200);
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

export default (type) => {
  const car = window.scene.getObjectByName('car');
  const existingCameras = window.scene.getObjectByName('camera');
  let camera;

  car.remove(existingCameras);

  switch (type) {
    case 'orthogonal':
      camera = orthogonal(0, 10, 0, scene.position);
      break;
    case 'thirdPerson':
      camera = perspective(0, 5, -10, car.position);
      car.add(camera);
      camera.lookAt(new Vector3(0, 0, 0));
      break;
    default:
      camera = perspective(75, 75, 75, scene.position);
      break;
  }

  window.camera = camera;
};
