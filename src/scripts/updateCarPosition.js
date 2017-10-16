import { Matrix4, Vector3 } from 'three';

/**
 * Update de car's Speed.
 * 
 * @param {THREE.Group} car The car object.
 * @param {int} delta The delta between the current and last updates.
 */
const updateSpeed = (car, delta) => {
  let acceleration = 0;
  const drag = 0.01;

  // TODO: Fix aceleration variations.
  if (car.forward) {
    acceleration = 2.5;
  }
  if(car.reverse) {
    acceleration = -1.5;
  }

  car.state.speed = car.state.speed + acceleration * delta;

  // Apply drag.
  car.state.speed = car.state.speed * (1 - drag);

  // Make full stop, if differance is marginal to zero speed.
  if (!car.forward && !car.reverse && Math.abs(car.state.speed) < 0.05) {
    car.state.speed = 0;
  }
  
  // Maximize the speed.
  const speedDirection = car.state.speed / Math.abs(car.state.speed);
  if (Math.abs(car.state.speed) > 0.5) {
    car.state.speed = speedDirection * 0.5;
  }
};

/**
 * Update the car's position due to its speed.
 * 
 * @param {THREE.Group} car The car object.
 * @param {int} delta The delta between the current and last updates.
 */
const updateSpeedPosition = (car, delta) => {
  const matrix = new Matrix4();

  matrix.setPosition(car.getWorldDirection().multiplyScalar(car.state.speed));
  car.applyMatrix(matrix);

  // Rotate wheels to match speed.
  rotateWheels(car, delta);
};

/**
 * Update the car's position due to its rotation.
 * 
 * @param {THREE.Group} car The car object.
 * @param {int} delta The delta between the current and last updates.
 */
const updateRotationPosition = (car, delta) => {
  const direction = car.left ? 1 : -1;
  const rotation = car.state.speed === 0 ? 0 : 2.5;
  car.rotateY(direction * rotation * delta);

  // Turn wheels to match rotation.
  if (!car.wheelsTurned) {
    turnWheels(car.getObjectByName('front').children, car.state.speed < 0 ? -direction : direction);
    car.wheelsTurned = true;
  }
};

/**
 * Turn wheels on Y axis to match turning.
 * 
 * @param {array} wheels 
 * @param {int} direction 
 */
const turnWheels = (wheels, direction) => {
  wheels.forEach((wheel) => {
    wheel.setRotationFromAxisAngle(new Vector3(0,1,0), direction * 0.5);
  });
};

/**
 * Turn wheels on X axis.
 * 
 * @param {THREE.Group} car 
 * @param {double} delta
 */
const rotateWheels = (car, delta) => {
  const rotation = -car.state.speed * delta * 10;
  car.traverse((node) => {
    if (node.name !== 'wheel') {
      return;
    }
    node.rotateZ(rotation);
  });
};

/**
 * Update car related movements.
 */
export default () => {
  const car = scene.getObjectByName('car');
  const delta = clock.getDelta();
  
  // Update speed.
  if (car.forward || car.reverse || car.state.speed !== 0) {
    updateSpeed(car, delta);
    updateSpeedPosition(car, delta);
  }
  
  if (car.left || car.right) {
    updateRotationPosition(car, delta);
  }

  if (((car.left && car.right) || (!car.left && !car.right)) && car.wheelsTurned) {
    turnWheels(car.getObjectByName('front').children, 0);
    car.wheelsTurned = false;
  }
};
