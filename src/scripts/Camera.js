import { PerspectiveCamera } from 'three';

export default () => {
  const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.position.set(0, 80, 60);
  camera.lookAt(scene.position);

  window.camera = camera;
}
