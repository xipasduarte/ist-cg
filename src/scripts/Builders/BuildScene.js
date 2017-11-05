import { AxisHelper, Vector3 } from 'three';

import Orange from './../Objects/Orange';
import Butters from './../Objects/Butters';
import Car from './../Objects/Car';
import Table from './../Objects/Table';
import Track from './../Objects/Track';
import Candles from './../Objects/Candles';
import Sun from './../Objects/Sun';

class BuildScene {
  static build(game) {
    game.scene.add(
      new AxisHelper(10),
      Table(0, 0, 0),
      Car(
        new Vector3(0, 3, 25), // Car initial position.
        new Vector3(1, 1, 1) // Car initial scale.
      ),
      Track(0, 0, 0),
      new Orange(3), // Amount.
      new Butters(5), // Amount.
      new Candles([
        // Candle positions.
        new Vector3(45, 5, 20),
        new Vector3(-45, 5, 20),
        new Vector3(-45, 5, -20),
        new Vector3(45, 5, -20),
        new Vector3(0, 5, 20),
        new Vector3(0, 5, -20)
      ]),
      new Sun()
    );
  }
}

export default BuildScene;
