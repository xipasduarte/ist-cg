import { Group, BoxGeometry, MeshBasicMaterial,  Mesh, Box3 } from 'three';

export default (number) => {
  const butters = new Group;
  butters.name = 'butters';
  const geometry = new BoxGeometry(5, 2, 2);
  const material = new MeshBasicMaterial({
    color: 0xffff00,
    wireframe: window.gameState.wireframe,
  });
  const butter = new Mesh(geometry, material);
  const safe_x = 120;
  const safe_z = 80;
  const AABB = new Box3();
  
  butter.state = {
    boundingBox: AABB,
  }
  butter.name = 'butter';

  for (let index = 0; index < number; index++) {
    const newButter = butter.clone();
    
        newButter.position.set(
          Math.random() * safe_x - safe_x/2,
          3,
          Math.random() * safe_z - safe_z/2
        );
    
        newButter.state = {
          boundingBox: new Box3().setFromObject(newButter),
        }
        
        butters.add(newButter);
  }

  return butters;
}
