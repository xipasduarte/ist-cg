import { Vector3 } from 'three';

export default () => {
	window.scene.traverse(
		(node) =>{
			if(['', 'oranges', 'butters', 'table', 'track', 'butter', 'orange', 'rim', 'wheel', 'front', 'back', 'AABB', 'camera'].indexOf(node.name) !== -1) {
      			return;
    		}
    		while( node.state.collision.length > 0 ){

    			var partner = window.scene.getObjectById( node.state.collision[0]);
    	 		var partnerOldMovement = new Vector3();
    	 		partnerOldMovement.copy(partner.state.mov);

    			var partnerOldVelocity = Math.abs(partner.state.speed);

    			var collisionVector = new Vector3();
    			collisionVector.copy(partner.position);

    	 		var collisionPartial;

    	 		node.state.collision.shift();
    			//remove from partner array

    	 		//node to partner velocity exchange
    	 		collisionVector.sub(node.position);
    	 		collisionVector.normalize();
    	 		collisionPartial = Math.abs(collisionVector.dot(node.state.mov));

 				partner.state.mov.add(collisionVector);
 				partner.state.mov.y = 0;
 				partner.state.mov.normalize();
 				partner.state.speed +=Math.abs(node.state.speed * collisionPartial);

 				//partner to node velocity exchange
 				if(node.name === 'car'){
 					return;
 				}
 				collisionVector.copy(node.position);
 				collisionVector.sub(partner.position);
 				collisionVector.normalize();
 				collisionPartial = Math.abs(collisionVector.dot( partnerOldMovement));

 				node.state.mov.add(collisionVector);
 				node.state.mov.y = 0;
 				node.state.speed += Math.abs(partnerOldVelocity * collisionPartial);
 				node.state.mov.normalize();

 				//cheerio on cheerio, reduce speed
 				node.state.speed = node.state.speed *(1-0.3);
 				partner.state.speed = partner.state.speed * (1-0.3);

    		}

		}

	);

}