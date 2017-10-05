import { Box3 } from 'three';

export default () => {
  const car = scene.getObjectByName('car').getObjectByName('car_body');

  let firstObject = car;
  const firstBB = new Box3().setFromObject(firstObject);

  for (let i = 0; i < 15; i++){
    let secondObject1 = scene.getObjectByName('butter' + i);
    let secondObject2 = scene.getObjectByName('ball' + i);
    let secondBB1 = new Box3().setFromObject(secondObject1);
    let secondBB2 = new Box3().setFromObject(secondObject2);
    let collision1 = firstBB.intersectsBox(secondBB1);
    let collision2 = firstBB.intersectsBox(secondBB2);
    if(collision1 == true){
      car.state.speed = car.state.speed*0.5;
    }
    if(collision2 == true){
      car.state.speed = 0;
    }
  }
}
