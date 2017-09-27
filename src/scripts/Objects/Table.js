import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

const addTableTop = (group, material, x, y, z) => {
  const geometry = new BoxGeometry(60, 2, 60);
  const top = new Mesh(geometry, material);

  top.position.set(x, y, z);
  group.add(top);
}

const addTableLeg = (group, material, x, y, z) => {
  const geometry = new BoxGeometry(2, 6, 2);
  const leg = new Mesh(geometry, material);

  leg.position.set(x, y, z);
  group.add(leg);
}

export default (x, y, z) => {
  const table = new Group();
  const material = new MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: window.gameState.wireframe,
  });

  addTableTop(table, material, 0, 0, 0);
  addTableLeg(table, material, 29, -4, 29);
  addTableLeg(table, material, -29, -4, 29);
  addTableLeg(table, material, 29, -4, -29);
  addTableLeg(table, material, -29, -4, -29);

  table.position.set(x, y, z);

  return table;
}
