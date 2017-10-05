import { Group, SphereGeometry, MeshBasicMaterial,  Mesh } from 'three';

export default (i, x, y, z) => {
  const geometry = new SphereGeometry(2);
  const material = new MeshBasicMaterial({
    color: 0xe55300,
    wireframe: window.gameState.wireframe,
  });
  const ball = new Mesh(geometry, material);
  const max_safe = 96;
  if(x===undefined){
    x = (Math.random() * max_safe) - max_safe/2;
    y = 2 + 2/2;
    z = (Math.random() * max_safe) - max_safe/2;
  }
  ball.position.set(x, y, z);
  ball.name = "ball" + i;

  return ball;
}
