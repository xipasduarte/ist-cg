import { PerspectiveCamera } from 'three';

export default () => {
  const camera = new PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.position.set(50, 50, 50);
  camera.lookAt(scene.position);

  window.camera = camera;
}
