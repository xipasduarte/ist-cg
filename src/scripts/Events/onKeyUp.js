export default (e) => {
  switch(e.keyCode) {
    case 37: // Left arrow
      gameState.car.left = false;
      break;
    case 38: // Top arrow
      gameState.car.forward = false;
      break;
    case 39: // Right
      gameState.car.right = false;
      break;
    case 40: // Down arrow
      gameState.car.reverse = false;
      break;
  }
}
