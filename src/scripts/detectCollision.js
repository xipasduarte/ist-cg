import { Box3 } from 'three';

export default () => {
  const car = scene.getObjectByName('car').getObjectByName('car_body');

  let firstObject = car;
  const firstBB = new Box3().setFromObject(firstObject);

  for (let i = 0; i < 3; i++){
    let secondObject = scene.getObjectByName('ball' + i);
    let secondBB = new Box3().setFromObject(secondObject);
    let collision = firstBB.intersectsBox(secondBB);
    if(collision == true){
      car.state.speed = 0;
    }
  }

  for (let i = 0; i < 5; i++){
    let secondObject = scene.getObjectByName('butter' + i);
    let secondBB = new Box3().setFromObject(secondObject);
    let collision = firstBB.intersectsBox(secondBB);
    if(collision == true){
      car.state.speed = car.state.speed*0.5;
    }
  }
}
