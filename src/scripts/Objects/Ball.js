import { Group, SphereGeometry, MeshBasicMaterial, Mesh } from 'three';

export default (x, y, z) => {
  const geometry = new SphereGeometry(4);
  const material = new MeshBasicMaterial({
    color: 0xff0000,
    wireframe: window.gameState.wireframe,
  });
  const ball = new Mesh(geometry, material);

  ball.position.set(x, y, z);

  return ball;
}
