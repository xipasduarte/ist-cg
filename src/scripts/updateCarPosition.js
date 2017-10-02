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

  if (gameState.car.forward) {
    acceleration = 0.005;
  }
  if(gameState.car.reverse) {
    acceleration = -0.0025;
  }

  car.state.speed = car.state.speed + acceleration * delta;

  // Apply drag.
  car.state.speed = car.state.speed * (1 - drag);

  // Make full stop, if differance is marginal to zero speed.
  if (Math.abs(car.state.speed) < 0.025) {
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
};

/**
 * Update the car's position due to its rotation.
 * 
 * @param {THREE.Group} car The car object.
 * @param {int} delta The delta between the current and last updates.
 */
const updateRotationPosition = (car, delta) => {
  const direction = gameState.car.left ? 1 : -1;
  car.rotateY(direction * 0.0025 * delta);

  // Move wheels to match rotation.
  rotateWheels(car.getObjectByName('front').children, direction);
};

const rotateWheels = (wheels, direction) => {
  wheels.forEach((wheel) => {
    wheel.setRotationFromAxisAngle(new Vector3(0,1,0), direction * 0.25);
  });
};

export default (step) => {
  const car = scene.getObjectByName('car');
  const delta = step - gameState.time;
  
  // Update speed.
  
  if (gameState.car.forward || gameState.car.reverse || car.state.speed !== 0) {
    updateSpeed(car, delta);
    updateSpeedPosition(car, delta);
  }

  if (gameState.car.left || gameState.car.right) {
    updateRotationPosition(car, delta);
  } else {
    rotateWheels(car.getObjectByName('front').children, 0);
  }
};
