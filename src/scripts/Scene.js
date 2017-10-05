import { Scene, AxisHelper } from 'three';
import Ball from './Objects/Ball';
import Butter from './Objects/Butter';
import Car from './Objects/Car';
import Table from './Objects/Table';
import Track from './Objects/Track';

export default () => {
  const scene = new Scene();
  scene.add(
    new AxisHelper(10),
    Table(0, 0, 0),
    Car(0, 3, 25),
    Track(0, 0, 0)
  );

  for (let i = 0; i < 3; i++){
    scene.add(Ball(i));
  }

  for (let i = 0; i < 5; i++){
      scene.add(Butter(i));
  }

  window.scene = scene;
}
