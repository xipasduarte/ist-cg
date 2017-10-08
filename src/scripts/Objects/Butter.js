import { Group, BoxGeometry, MeshBasicMaterial,  Mesh } from 'three';

export default (number) => {
  const butters = new Group;
  const geometry = new BoxGeometry(5, 2, 2);
  const material = new MeshBasicMaterial({
    color: 0xffff00,
    wireframe: window.gameState.wireframe,
  });
  const butter = new Mesh(geometry, material);
  const max_safe = 90;
  
  butter.name = 'butter';

  for (let index = 0; index < number; index++) {
    butter.position.set(
      Math.random() * max_safe - max_safe/2,
      2 + 2/2,
      Math.random() * max_safe - max_safe/2
    );
    butters.add(butter.clone());
  }

  return butters;
}
