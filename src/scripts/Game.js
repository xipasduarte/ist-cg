import { Clock, Vector3 } from 'three';

import Camera from './Camera';
import Scene from './Scene';
import Renderer from './Renderer';

import onResize from './Events/onResize';
import onKeyDown from './Events/onKeyDown';
import onKeyUp from './Events/onKeyUp';

class Game {
    constructor() {
        this.state = {
            wireframe: true,
            table: {
                width: 140,
                height: 100,
            },
        };
    }
    
    init() {
        window.clock = new Clock();
        Scene();
        Camera('orthogonal');
        Renderer();

        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', onResize);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
    }

    restart() {
        const car = window.scene.getObjectByName('car');
        car.state.speed = 0;
        car.setRotationFromAxisAngle(new Vector3(0, 1, 0), -Math.PI/2);
        car.position.copy(new Vector3(0, 3, 25));
        window.clock.stop();
        window.clock.start();
    }
};

export default Game;