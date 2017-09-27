import { Scene, AxisHelper } from 'three';
import Ball from './Objects/Ball';
import Car from './Objects/Car';
import Table from './Objects/Table';

export default () => {
  const scene = new Scene();

  scene.add(
    new AxisHelper(10),
    Table(0, 0, 0),
    Car(0, 10, 0)
  );

  window.scene = scene;
}
