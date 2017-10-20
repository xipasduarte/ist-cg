import { Clock, Vector3 } from 'three';

import Camera from './Camera';
import Scene from './Scene';
import Renderer from './Renderer';

import onResize from './Events/onResize';
import onKeyDown from './Events/onKeyDown';
import onKeyUp from './Events/onKeyUp';

class Game {
    init() {
        // Add state.
        window.gameState = {
            wireframe: true,
            time: 0,
            car: {
                forward: false,
                reverse: false,
                left: false,
                right: false,
            },
            camera: {
                type: 'ortogonal',
            },
        };
        window.clock = new Clock();

        Scene();
        Camera();
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
    }
};

export default Game;