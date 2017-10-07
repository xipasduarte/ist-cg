import {
  AxisHelper,
  Group,
  BoxGeometry,
  TorusGeometry,
  PlaneGeometry,
  RingGeometry,
  PolyhedronGeometry,
  Shape,
  ShapeGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
  Triangle,
  Vector3
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
  wheel.rotateY(-Math.PI/2);
  group.add(wheel);
}

const addBody = (group, x, y, z) => {
  const body = new Group();
  const frontGeometry = new BoxGeometry(3, 1, 3);
  const backGeometry = new BoxGeometry(3, 2, 3);
  const glassGeometry = new PlaneGeometry(Math.sqrt(10), 3, 2, 2);
  const front = new Mesh(frontGeometry, new MeshBasicMaterial({ color: 0xff9900, wireframe: true }));
  const back = new Mesh(backGeometry, new MeshBasicMaterial({ color: 0xff9900, wireframe: true }));
  const glass = new Mesh(glassGeometry, new MeshBasicMaterial({ color: 0x0000ff,side: DoubleSide, wireframe: true }));

  glass.rotation.y=Math.atan(-1/3);
  glass.rotation.x=Math.PI/2;
  glass.position.set(3, 0.5, 0);

  front.position.set(3, -.5, 0);

  body.add(front, back, glass);
  body.position.set(x, y, z);
  body.rotateY(-Math.PI/2);

  group.add(body);
}

export default (x, y, z) => {
  const car = new Group();

  car.state = {
    acceleration: 0.01,
    speed: 0,
  }

  addBody(car, 0, 0, 0);
  // Back.
  addWheel(car, 2.5, -0.5, 0);
  addWheel(car, -2.5, -0.5, 0);
  // Front.
  addWheel(car, 2.5, -0.5, 3);
  addWheel(car, -2.5, -0.5, 3);

  car.add(new AxisHelper(5));

  car.name = 'car';
  car.position.set(x, y, z);

  return car;
}
