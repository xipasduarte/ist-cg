import { Matrix4, Vector3 } from 'three';

/**
 * Update de car's Speed.
 * 
 * @param {THREE.Group} car The car object.
 * @param {int} delta The delta between the current and last updates.
 */
const updateSpeed = (car, delta) => {
  if (car.forward && car.state.acceleration <= 50) {
    car.state.acceleration += 10;
  } else if(car.reverse && car.state.acceleration >= -50) {
    car.state.acceleration -= 25;
  } else {
    car.state.acceleration = 0;
  }

  // Width drag effect.
  car.state.speed = car.state.speed * 0.99 + car.state.acceleration * delta;

  // Make full stop, if differance is marginal to zero speed.
  if (!car.forward && !car.reverse && Math.abs(car.state.speed) < 2) {
    car.state.speed = 0;
  }
  
  // Maximize the speed.
  const speedDirection = car.state.speed / Math.abs(car.state.speed);
  if (Math.abs(car.state.speed) > 50) {
    car.state.speed = speedDirection * 50;
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

  matrix.setPosition(car.getWorldDirection().multiplyScalar(car.state.speed * delta));
  car.applyMatrix(matrix);

  if (
    Math.abs(car.position.x) > 70 ||
    Math.abs(car.position.z) > 50
  ) {
    window.game.restart();
  }

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
  if (
    (car.left && !car.turningLeft) ||
    (car.right && !car.turningRight)
  ) {
    turnWheels(car.getObjectByName('front').children, car.state.speed < 0 ? -direction : direction);
    car.turningLeft = car.left;
    car.turningRight = car.right;
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
  const rotation = -car.state.speed * delta / 2;
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
export default (delta) => {
  const car = scene.getObjectByName('car');
  
  // Update speed and position.
  if (car.forward || car.reverse || car.state.speed !== 0) {
    updateSpeed(car, delta);
    updateSpeedPosition(car, delta);
  }
  
  // Update car orientation when either left or right keys are pressed.
  if (car.left || car.right) {
    updateRotationPosition(car, delta);
  }

  // Remove front wheel Y rotation when the car is not turning.
  if (!car.left && !car.right && (car.turningLeft || car.turningRight)) {
    turnWheels(car.getObjectByName('front').children, 0);
    car.turningLeft = false;
    car.turningRight = false;
  }
};
