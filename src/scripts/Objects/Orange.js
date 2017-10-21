import { Box3, Group, SphereGeometry, MeshBasicMaterial, Mesh, Vector3 } from 'three';

export default (number) => {
  const oranges = new Group();
  oranges.name = 'oranges';

  // Common characteristics.
  const geometry = new SphereGeometry(2);
  const material = new MeshBasicMaterial({
    color: 0xcc5300,
    wireframe: window.game.state.wireframe,
  });
  const orange = new Mesh(geometry, material);
  orange.name = 'orange';

  // Orange spawn limits.
  const safe_x = 120;
  const safe_z = 80;

  for (let index = 0; index < number; index++) {
    const newOrange = orange.clone();

    newOrange.position.set(
      Math.random() * safe_x - safe_x/2,
      3,
      Math.random() * safe_z - safe_z/2
    );

    newOrange.state = {
      boundingBox: new Box3().setFromObject(newOrange),
      speed: 0.1 * (1 + window.clock.getElapsedTime() / 10) + Math.random() * 0.2,
      direction: new Vector3(0.5 - Math.random(), 0, 0.5 - Math.random()).normalize(),
    }
    
    oranges.add(newOrange);
  }

  return oranges;
}
