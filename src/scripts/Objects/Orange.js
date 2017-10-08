import { Group, SphereGeometry, MeshBasicMaterial,  Mesh } from 'three';

export default (number) => {
  const oranges = new Group();
  const geometry = new SphereGeometry(2);
  const material = new MeshBasicMaterial({
    color: 0xcc5300,
    wireframe: window.gameState.wireframe,
  });
  const orange = new Mesh(geometry, material);
  const max_safe = 96;

  orange.name = 'orange';

  for (let index = 0; index < number; index++) {
    orange.position.set(
      Math.random() * max_safe - max_safe/2,
      2 + 2/2,
      Math.random() * max_safe - max_safe/2
    );
    oranges.add(orange.clone());
  }

  return oranges;
}
