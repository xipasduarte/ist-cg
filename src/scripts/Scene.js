import { Scene, AxisHelper } from 'three';
import Orange from './Objects/Orange';
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
    Track(0, 0, 0),
    Orange(5),
    Butter(5)
  );

  window.scene = scene;
}
