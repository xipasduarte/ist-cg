export default (e) => {
  switch(e.keyCode) {
    // case: 37 // Left arrow
    case 38: // Top arrow
      gameState.car.isMoving = false;
      break;
    // case: 39 // Right arrow
    case 40: // Down arrow
      gameState.car.isMoving = false;
      gameState.car.reverse = false;
  }
}
