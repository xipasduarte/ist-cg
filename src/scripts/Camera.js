import { PerspectiveCamera, OrthographicCamera, Vector3 } from 'three';

const orthogonal = (x, y, z, lookAt) => {
  const factor = (window.innerWidth * window.innerHeight * 12) / (1275 * 707);
  const camera = new OrthographicCamera(-window.innerWidth / factor, window.innerWidth / factor, window.innerHeight / factor, -window.innerHeight / factor, 1, 200);
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
      camera.position.set(0,7,-6);
      camera.lookAt(new Vector3(0, 4, 0));
      break;
    default:
      camera = perspective(0, 2, 40, scene.position);
      break;
  }

  window.camera = camera;
};
