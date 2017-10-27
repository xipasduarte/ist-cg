import { Clock, WebGLRenderer, Scene, AxisHelper, Vector3, BoxHelper } from 'three';

import buildCameras from './buildCameras';

import Orange from './Objects/Orange';
import Butter from './Objects/Butter';
import Car from './Objects/Car';
import Table from './Objects/Table';
import Track from './Objects/Track';

import onResize from './Events/onResize';
import onKeyDown from './Events/onKeyDown';
import onKeyUp from './Events/onKeyUp';

import detectCollision from './detectCollision';
import treatCollision from './treatCollision';
import updateCarPosition from './updateCarPosition';
import updateOrangePosition from './updateOrangePosition';
import updateCheerioPosition from './updateCheerioPosition';
import updateControls from './updateControls';

class Game {
    constructor() {
        this.state = {
            clock: new Clock(),
            scene: new Scene(),
            renderer: new WebGLRenderer(),
            wireframe: true,
            table: {
                width: 140,
                height: 100,
            },
        };
    }
    
    init() {
        this.state.scene.add(
            new AxisHelper(10),
            Table(0, 0, 0),
            Car(
              new Vector3(0, 3, 25), // Car initial position.
              new Vector3(1, 1, 1) // Car initial scale.
            ),
            Track(0, 0, 0),
            Orange(3),
            Butter(5)
        );
        
        // Build cameras.
        this.state.cameras = buildCameras(this.state.scene);
        this.state.currentCamera = this.state.cameras.orthogonal;

        this.state.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.state.renderer.domElement);

        window.addEventListener('resize', onResize);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
    }

    animate() {
        const delta = this.state.clock.getDelta();
    
        this.state.scene.traverse((node) => {
            if(node.name !== 'AABB') {
                return;
            }
            node.update();
        });
        
        detectCollision();
        treatCollision();
        
        updateCarPosition(delta);
        updateOrangePosition(delta);
        updateCheerioPosition(delta);
        
        updateControls();
        
        this.state.renderer.render(this.state.scene, this.state.currentCamera);

        // Recursive call to animate.
        window.requestAnimationFrame(this.animate.bind(this));
    }

    restart() {
        const car = this.state.scene.getObjectByName('car');
        car.state.speed = 0;
        car.setRotationFromAxisAngle(new Vector3(0, 1, 0), -Math.PI/2);
        car.position.copy(new Vector3(0, 3, 25));
        this.state.clock.stop();
        this.state.clock.start();

        // Reposition cheerios.
        const cheerios = this.state.scene.getObjectByName('track');
        cheerios.children.forEach((cheerio) => {
            cheerio.state.speed = 0;
            cheerio.state.mov = new Vector3();
            cheerio.position.copy(cheerio.state.initialPosition);
            cheerio.state.boundingBox.setFromObject(cheerio);
        });
    }
};

export default Game;