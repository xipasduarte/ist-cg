import { Box3, Vector3 } from 'three';

/**
 * Regenerate oranges that leave the table bounds.
 * 
 * @param {THREE.Object3D} orange 
 */
const respawnOrange = (orange) => {
    // Orange spawn limits.
    const safe_x = 120;
    const safe_z = 80;

    orange.position.set(
        Math.random() * safe_x - safe_x/2,
        3,
        Math.random() * safe_z - safe_z/2
    );

    orange.state = Object.assign(orange.state, {
        boundingBox: new Box3().setFromObject(orange),
        speed: 0.1 * (1 + window.clock.getElapsedTime() / 10) + Math.random() * 0.2,
        direction: new Vector3(0.5 - Math.random(), 0, 0.5 - Math.random()).normalize(),
    });
};

/**
 * Move the orange on the table.
 * 
 * @param {THREE.Object3D} orange 
 */
const moveOrange = (orange) => {
    const increment = new Vector3();
    increment.copy(orange.state.direction);
    increment.multiplyScalar(orange.state.speed);
    orange.position.add(increment);
    orange.state.boundingBox.setFromObject(orange);

    if (
        Math.abs(orange.position.x) > 70 ||
        Math.abs(orange.position.z) > 50
    ) {
        respawnOrange(orange);
    }
};

export default () => {
    const oranges = scene.getObjectByName('oranges');

    oranges.children.forEach((orange) => {
        moveOrange(orange);
    });
};