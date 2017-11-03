import { Scene, AxisHelper, Vector3, BoxHelper, PlaneGeometry, MeshStandardMaterial, Mesh, SphereBufferGeometry} from 'three';
import Orange from './Objects/Orange';
import Butter from './Objects/Butter';
import Car from './Objects/Car';
import Table from './Objects/Table';
import Track from './Objects/Track';
import Vela from './Objects/Vela';

export default () => {
  const scene = new Scene();
  scene.add(
    new AxisHelper(10),
    Table(0, 0, 0),
    Car(
      new Vector3(0, 3, 25), // Car initial position.
      new Vector3(1, 1, 1) // Car initial scale.
    ),
    Track(0, 0, 0),
    Orange(3),
    Butter(5),
    Vela(),
  );
  window.scene = scene;
}
