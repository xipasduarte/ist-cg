import { Group, SphereGeometry, MeshBasicMaterial,  Mesh, Box3 } from 'three';

export default (number) => {
  const oranges = new Group();
  oranges.name = 'oranges';
  const geometry = new SphereGeometry(2);
  const material = new MeshBasicMaterial({
    color: 0xcc5300,
    wireframe: window.gameState.wireframe,
  });
  const orange = new Mesh(geometry, material);
  const safe_x = 120;
  const safe_z = 80;

  const AABB = new Box3();

  orange.name = 'orange';

  for (let index = 0; index < number; index++) {
    const newOrange = orange.clone();

    newOrange.position.set(
      Math.random() * safe_x - safe_x/2,
      3,
      Math.random() * safe_z - safe_z/2
    );

    newOrange.state = {
      boundingBox: new Box3().setFromObject(newOrange),
    }
    
    oranges.add(newOrange);
  }

  return oranges;
}
