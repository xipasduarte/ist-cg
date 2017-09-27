import {
  Group,
  BoxGeometry,
  TorusGeometry,
  RingGeometry,
  PolyhedronGeometry,
  Shape,
  ShapeGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three';

const addWheel = (group, x, y, z) => {
  const wheel = new Group();
  const tireGeometry = new TorusGeometry(.75, .25, 16, 30);
  const plateGeometry = new RingGeometry(.1, .5);

  wheel.add(
    new Mesh(tireGeometry, new MeshBasicMaterial({
      color: 0x666666,
      wireframe: true,
    })),
    new Mesh(plateGeometry, new MeshBasicMaterial({
      color: 0x999999,
      wireframe: true,
    }))
  );

  wheel.position.set(x, y, z);
  group.add(wheel);
}

const addBody = (group, x, y, z) => {
  const body = new Group();
  const frontGeometry = new BoxGeometry(3, 1, 3);
  const backGeometry = new BoxGeometry(3, 2, 3);
  const material = new MeshBasicMaterial({ color: 0xff9900, wireframe: true });
  const front = new Mesh(frontGeometry, material);
  const back = new Mesh(backGeometry, material);

  front.position.set(3, -.5, 0);

  body.add(front, back);

  body.position.set(x, y, z);
  group.add(body);
}

export default (x, y, z) => {
  const car = new Group();

  addBody(car, 0, 0, 0);
  // Back.
  addWheel(car, 0, -0.5, 1.5);
  addWheel(car, 0, -0.5, -1.5);
  // Front.
  addWheel(car, 3, -0.5, 1.5);
  addWheel(car, 3, -0.5, -1.5);

  car.position.set(x, y, z);

  return car;
}
