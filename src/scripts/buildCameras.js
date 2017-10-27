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

const buildThirdPersonCamera = (scene) => {
  const car = scene.getObjectByName('car');
  const camera = perspective(0, 5, -10, car.position);
  car.add(camera);
  camera.lookAt(new Vector3(0, 0, 0));
  return camera;
}

export default (scene) => {
  return {
    orthogonal: orthogonal(0, 10, 0, scene.position),
    thirdPerson: buildThirdPersonCamera(scene),
    perspective: perspective(75, 75, 75, scene.position),
  };
};
