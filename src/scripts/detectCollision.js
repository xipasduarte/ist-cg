import { Box3 } from 'three';

const checkCollisionBoxes = (A,B) => {
	if (
		A.max.x > B.min.x &&
		A.min.x < B.max.x &&
		A.max.y > B.min.y &&
		A.min.y < B.max.y &&
		A.max.z > B.min.z &&
		A.min.z < B.max.z
	) {
		return true;
	}
	return false;
};

export default () => {
	const car = window.scene.getObjectByName('car');
	const oranges = window.scene.getObjectByName('oranges');
	const track = window.scene.getObjectByName('track');
	const butters = window.scene.getObjectByName('butters');
	const carBox = new Box3();
	carBox.setFromObject(car);

	oranges.children.forEach(
		(orange) => {
			if (checkCollisionBoxes(orange.state.boundingBox, carBox)) {
				console.log('bum');
				window.game.restart();
			}
		}
	);

	butters.children.forEach(
		(butter) =>{
			if (checkCollisionBoxes(butter.state.boundingBox,carBox)) {
				car.state.collision.push(butter.id);
				if(butter.state.dirty){
					return;
				}
				console.log('butter');
				if(car.reverse){
					butter.state.reverse = true;
				}
				if(car.forward){
					butter.state.forward = true;
				}
				if(car.right && car.turningRight){
					butter.state.right = true;
				}
				else if (car.left && car.turningLeft){
					butter.state.left = true;
				}
				butter.state.dirty = true;
				return;

			}else if(butter.state.dirty){
				butter.state.reverse = false;
				butter.state.forward = false;
				butter.state.right = false;
				butter.state.left = false;
				butter.state.dirty = false;
			}
		}
	);

	track.children.forEach(
		(cheerio) =>{
			if (checkCollisionBoxes(cheerio.state.boundingBox,carBox)) {
				//check for false positives, use radius ??
				console.log('cheerio');
				car.state.collision.push(cheerio.id);
			}
		}
	);

	track.children.forEach(
		(referenceNode) =>{
			track.children.forEach(
				(trackNode) =>{
					if(referenceNode.id === trackNode.id){
						return;
					}
					if(checkCollisionBoxes(referenceNode.state.boundingBox,trackNode.state.boundingBox)){
						console.log('cheerio on cheerio murder');
						referenceNode.state.collision.push(trackNode.id);
						
					}
				}
			)
		}
	);
};