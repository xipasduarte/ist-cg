import { Scene, AxisHelper, Vector3 } from 'three';
import Ball from './Objects/Ball';
import Butter from './Objects/Butter';
import Car from './Objects/Car';
import Table from './Objects/Table';

export default () => {
  const scene = new Scene();
  scene.add(
    new AxisHelper(10),
    Table(0, 0, 0),
    Car(0, 10, 0),
  );

  for (let i = 0; i < 15; i++){
    scene.add(Ball(i));
    scene.add(Butter(i));
  }

  window.scene = scene;
}
