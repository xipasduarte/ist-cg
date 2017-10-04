import {
  AxisHelper,
  Group,
  BoxGeometry,
  TorusGeometry,
  RingGeometry,
  PolyhedronGeometry,
  Shape,
  ShapeGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  Object3D
} from 'three';

const addWheel = (group, x, y, z) => {
  const wheel = new Group();
  const tireGeometry = new TorusGeometry(.75, .35, 16, 30);
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
  const front = new Mesh(frontGeometry, new MeshBasicMaterial({ color: 0xff9900, wireframe: true }));
  const back = new Mesh(backGeometry, new MeshBasicMaterial({ color: 0xff9900, wireframe: true }));

  // Back.
  back.name = 'back';
  addWheel(back, 0, -0.5, 2.5);
  addWheel(back, 0, -0.5, -2.5);

  // Front.
  front.name = 'front';
  front.position.set(3, -.5, 0);
  addWheel(front, 0, -0.5, 2.5);
  addWheel(front, 0, -0.5, -2.5);

  body.add(front, back);
  body.position.set(x, y, z);
  body.rotateY(-Math.PI/2);

  group.add(body);
}

export default (x, y, z) => {
  const car = new Group();

  car.state = {
    acceleration: 0.01,
    drag: 0.1,
    speed: 0,
  }

  addBody(car, 0, 0, 0);

  car.add(new AxisHelper(5));

  car.name = 'car';
  car.rotateY(-Math.PI/2);
  car.position.set(x, y, z);


  return car;
}
