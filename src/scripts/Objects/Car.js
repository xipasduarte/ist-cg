import {
  AxisHelper,
  BoxGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  PolyhedronGeometry,
  RingGeometry,
  Shape,
  TorusGeometry,
  Vector3,
  CylinderGeometry
} from 'three';

/**
 * Create glass object.
 */
const addGlass = () => {
  const glassGeometry = new CylinderGeometry(1, 1.5, 1, 6);
  const glass = new Mesh(glassGeometry, new MeshBasicMaterial({ color: 0x0000ff, wireframe: true }));

  glass.position.y = 2;

  return glass;
};

/**
 * Create glass object.
 */
const addBody = () => {
  const bodyShape = new Shape();
  bodyShape.moveTo(-4, 0);
  bodyShape.lineTo(4, 0);
  bodyShape.lineTo(4, .5);
  bodyShape.lineTo(2, 1.5);
  bodyShape.lineTo(-4, 1.5);

  const glassGeometry = new ExtrudeGeometry(bodyShape, {
    steps: 1,
    amount: 3,
    bevelEnabled: false,
  });

  const body = new Mesh(glassGeometry, new MeshBasicMaterial({ color: 0x00ff00, wireframe: true }));

  body.position.x = 1.5;
  body.rotateY(-Math.PI/2);

  return body;
};

/**
 * Add wheel to group in specific position.
 *
 * @param {double} x
 * @param {double} y
 * @param {double} z
 */
const addWheel = (x, y, z) => {
  const wheel = new Group();
  const tireGeometry = new TorusGeometry(.7, .40, 5, 10);
  const rimGeometry = new RingGeometry(.1, .5);
  const tire = new Mesh(tireGeometry, new MeshBasicMaterial({
    color: 0x666666,
    wireframe: true,
  }));
  const rim = new Mesh(rimGeometry, new MeshBasicMaterial({
    color: 0x999999,
    wireframe: true,
    side: DoubleSide,
  }));

  rim.name = 'rim';

  wheel.add(tire, rim);
  wheel.name = 'wheel';
  wheel.position.set(x, y, z);

  return wheel;
};

/**
 * Add car body to group.
 *
 * @param {double} x
 * @param {double} y
 * @param {double} z
 */
const addWheels = () => {
  const wheels = new Group();
  const front = new Group();
  const back = new Group();

  // Back.
  back.name = 'back';
  back.add(
    addWheel(0, 0, 2.5),
    addWheel(0, 0, -2.5),
  );

  // Front.
  front.name = 'front';
  front.add(
    addWheel(0, 0, 2.5),
    addWheel(0, 0, -2.5),
  );

  front.position.x = 2;
  back.position.x = -2.5;

  wheels.add(front, back);
  wheels.rotateY(-Math.PI/2);

  return wheels;
};

/**
 * Create car on given position.
 *
 * @param {double} x
 * @param {double} y
 * @param {double} z
 */
export default (position, scale = new Vector3(1, 1, 1)) => {
  const car = new Group();

  car.state = {
    acceleration: 0,
    speed: 0,
    collision: [],
    turningLeft: false,
    turningRight: false,
    mov: new Vector3(),
    isStuck: false,
    forward: false,
    reverse: false,
    left: false,
    right: false,
  };

  car.add(
    addBody(),
    addGlass(),
    addWheels()
  );
  car.name = 'car';
  car.rotateY(-Math.PI/2);

  car.position.copy(position);
  car.scale.copy(scale);

  return car;
};
