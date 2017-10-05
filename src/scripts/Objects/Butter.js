import { Group, BoxGeometry, MeshBasicMaterial,  Mesh } from 'three';

export default (i, x, y, z) => {
  const geometry = new BoxGeometry(5, 2, 2);
  const material = new MeshBasicMaterial({
    color: 0xffff00,
    wireframe: window.gameState.wireframe,
  });
  const butter = new Mesh(geometry, material);
  const max_safe = 90;
  if(x===undefined){
  	x = (Math.random() * max_safe) - max_safe/2;
	y = 2 + 2/2;
	z = (Math.random() * max_safe) - max_safe/2;
  }
  butter.name = "butter" + i;
  butter.position.set(x, y, z);

  return butter;
}
