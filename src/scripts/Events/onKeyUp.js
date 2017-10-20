export default (e) => {
  const car = window.scene.getObjectByName('car');

  switch(e.keyCode) {
    case 37: // Left arrow
      car.left = false;
      break;
    case 38: // Top arrow
      car.forward = false;
      break;
    case 39: // Right
      car.right = false;
      break;
    case 40: // Down arrow
      car.reverse = false;
      break;
  }
}
