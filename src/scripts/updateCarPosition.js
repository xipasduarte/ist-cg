import { Matrix4 } from 'three';

const updateSpeedPosition = (car, delta) => {
  const matrix = new Matrix4();
  const inReverse = gameState.car.reverse ? -1 : 1;
  const acceleration = gameState.car.forward || gameState.car.reverse ? 0.005 : 0;
  const drag = 0.01;

  car.state.speed = car.state.speed + inReverse * acceleration * delta;

  const speedDirection = car.state.speed / Math.abs(car.state.speed);

  // Apply drag.
  car.state.speed = car.state.speed * (1 - drag);

  // Make full stop, if differance is marginal to zero speed.
  if (Math.abs(car.state.speed) < 0.02) {
    car.state.speed = 0;
  }

  // Maximize the speed.
  if (Math.abs(car.state.speed) > 0.5) {
    car.state.speed = speedDirection * 0.5;
  }

  matrix.setPosition(car.getWorldDirection().multiplyScalar(car.state.speed));
  car.applyMatrix(matrix);
}

const updateRotationPosition = (car) => {
  const direction = gameState.car.left ? 1 : -1;
  car.rotateY(direction * 0.025);
}

export default (step) => {
  const car = scene.getObjectByName('car');
  const delta = step - gameState.time;

  if (gameState.car.forward || gameState.car.reverse || car.state.speed !== 0) {
    updateSpeedPosition(car, delta);
  }

  if (gameState.car.left || gameState.car.right) {
    updateRotationPosition(car);
  }
}
