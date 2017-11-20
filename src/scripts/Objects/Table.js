import {
  Group,
  BoxGeometry,
  Box3,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Texture,
  TextureLoader,
  RepeatWrapping
} from 'three';

const addTableTop = (group, width, height, x, y, z) => {
  var texture = new TextureLoader().load('public/images/tablecloth.jpg');
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(14, 10); // Bases on the ratio of the table.

  const geometry = new BoxGeometry(width, 2, height, 25, 2, 25);
  const materialArgs = {
    color: 0xa66829,
    wireframe: window.game.state.wireframe,
    map: texture
  };
  const top = new Mesh(geometry, new MeshBasicMaterial(materialArgs));

  top.userData = {
    materials: [
      new MeshBasicMaterial(materialArgs),
      new MeshLambertMaterial(materialArgs),
      new MeshPhongMaterial({
        color: 0xa66829,
        wireframe: window.game.state.wireframe,
        shininess: 10,
        map: texture,
      }),
    ],
  }

  top.position.set(x, y, z);
  group.add(top);
}

const addTableLeg = (group, x, y, z, name) => {
  const geometry = new BoxGeometry(2, 6, 2);
  const materialArgs = {
    color: 0xa66829,
    wireframe: window.game.state.wireframe,
  };
  const leg = new Mesh(geometry, new MeshBasicMaterial(materialArgs));

  leg.userData = {
    materials: [
      new MeshBasicMaterial(materialArgs),
      new MeshLambertMaterial(materialArgs),
      new MeshPhongMaterial(materialArgs),
    ],
  }

  leg.name = name;
  leg.position.set(x, y, z);
  group.add(leg);
}

export default (x, y, z) => {
  const width = window.game.state.table.width;
  const height = window.game.state.table.height;
  const table = new Group();

  addTableTop(table, width, height, 0, 0, 0);
  addTableLeg(table, (width/2 - 1), -4, (height/2 - 1));
  addTableLeg(table, -(width/2 - 1), -4, (height/2 - 1));
  addTableLeg(table, (width/2 - 1), -4, -(height/2 - 1));
  addTableLeg(table, -(width/2 - 1), -4, -(height/2 - 1));

  table.position.set(x, y, z);
  table.name = 'table';
  table.userData.boundingBox = new Box3().setFromObject(table);

  return table;
}
