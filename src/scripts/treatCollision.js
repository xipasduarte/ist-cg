import { Vector3 } from 'three';

export default () => {
	window.scene.traverse(
		(reference) => {
			if (['cheerio'].indexOf(reference.name) === -1) {
      			return;
			}

			reference.state.collision.forEach((partnerId) => {
				const partner = window.scene.getObjectById(partnerId);
				const partnerOldMovement = new Vector3();
				partnerOldMovement.copy(partner.state.mov);

				const partnerOldVelocity = Math.abs(partner.state.speed);

				const collisionVector = new Vector3();
				collisionVector.copy(partner.position);

				let collisionPartial;

				// Reference to partner velocity exchange.
				collisionVector.sub(reference.position);
				collisionVector.normalize();
				collisionPartial = Math.abs(collisionVector.dot(reference.state.mov));

				partner.state.mov.add(collisionVector);
				partner.state.mov.y = 0;
				partner.state.mov.normalize();
				partner.state.speed += Math.abs(reference.state.speed * collisionPartial);

				//partner to reference velocity exchange
				if (partner.name === 'car') {
					return;
				}
				
				collisionVector.copy(reference.position);
				collisionVector.sub(partner.position);
				collisionVector.normalize();
				collisionPartial = Math.abs(collisionVector.dot( partnerOldMovement));

				reference.state.mov.add(collisionVector);
				reference.state.mov.y = 0;
				reference.state.speed += Math.abs(partnerOldVelocity * collisionPartial);
				reference.state.mov.normalize();

				//cheerio on cheerio, reduce speed
				reference.state.speed = reference.state.speed *(1-0.3);
				partner.state.speed = partner.state.speed * (1-0.3);
			});

			reference.state.collision = [];
		}
	);
}