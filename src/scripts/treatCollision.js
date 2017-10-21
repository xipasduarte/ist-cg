import { Vector3 } from 'three';

export default () => {
	window.scene.traverse(
		(reference) => {
			if (['cheerio'].indexOf(reference.name) === -1) {
      			return;
			}

			reference.state.collision.forEach((partnerId) => {
				const partner = window.scene.getObjectById(partnerId);
				const referenceOldMovement = new Vector3();
				referenceOldMovement.copy(reference.state.mov);

				const referenceOldVelocity = Math.abs(reference.state.speed);

				const collisionVector = new Vector3();

				let collisionPartial;
				//partner to reference velocity exchange
				collisionVector.copy(reference.position);
				collisionVector.sub(partner.position);
				collisionVector.normalize();
				collisionPartial = Math.abs(collisionVector.dot( partner.state.mov));

				reference.state.mov.add(collisionVector);
				reference.state.mov.y = 0;
				reference.state.speed += Math.abs(partner.state.speed * collisionPartial);
				reference.state.mov.normalize();

				if (partner.name === 'car') {
					return;
				}
				// Reference to partner velocity exchange.
				collisionVector.copy(partner.position);
				collisionVector.sub(reference.position);
				collisionVector.normalize();
				collisionPartial = Math.abs(collisionVector.dot(referenceOldMovement));

				partner.state.mov.add(collisionVector);
				partner.state.mov.y = 0;
				partner.state.mov.normalize();
				partner.state.speed += Math.abs(referenceOldVelocity * collisionPartial);

				//cheerio on cheerio, reduce speed
				reference.state.speed = reference.state.speed *(1-0.3);
				partner.state.speed = partner.state.speed * (1-0.3);
			});

			reference.state.collision = [];
		}
	);
}