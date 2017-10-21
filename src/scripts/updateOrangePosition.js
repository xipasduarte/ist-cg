import { Box3, Matrix4, Vector3 } from 'three';

/**
 * Regenerate oranges that leave the table bounds.
 * 
 * @param {THREE.Object3D} orange 
 */
const respawnOrange = (orange) => {
    // Reset rotation.
    orange.setRotationFromAxisAngle(orange.state.rotationVector, 0);
    
    // Orange spawn limits.
    const safe_x = 120;
    const safe_z = 80;

    orange.position.set(
        Math.random() * safe_x - safe_x/2,
        3,
        Math.random() * safe_z - safe_z/2
    );

    const baseSpeed = 5 * (1 + Math.floor(window.clock.getElapsedTime() / 30));
    const directionVector = new Vector3(0.5 - Math.random(), 0, 0.5 - Math.random()).normalize();
    const rotationVector = new Vector3(directionVector.z, 0, -directionVector.x);

    orange.state = Object.assign(orange.state, {
        boundingBox: new Box3().setFromObject(orange),
        speed: baseSpeed * (1 + Math.random() * 0.2),
        direction: directionVector,
        rotationVector: rotationVector,
    });
};

/**
 * Move the orange on the table.
 * 
 * @param {THREE.Object3D} orange 
 */
const moveOrange = (orange, delta) => {
    const distance = orange.state.speed * delta;

    orange.position.addScaledVector(orange.state.direction, distance);
    orange.rotateOnAxis(orange.state.rotationVector, distance/2);
    orange.state.boundingBox.setFromObject(orange);

    if (
        Math.abs(orange.position.x) > 70 ||
        Math.abs(orange.position.z) > 50
    ) {
        respawnOrange(orange);
    }
};

export default (delta) => {
    const oranges = scene.getObjectByName('oranges');

    oranges.children.forEach((orange) => {
        moveOrange(orange, delta);
    });
};