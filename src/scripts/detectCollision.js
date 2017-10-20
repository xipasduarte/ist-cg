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
				console.log('butter');
			}
		}
	);

	track.children.forEach(
		(cheerio) =>{
			if (checkCollisionBoxes(cheerio.state.boundingBox,carBox)) {
				console.log('cheerio');
				car.state.collision.push(cheerio.id);
				cheerio.state.collision.push(car.id);
			}
		}
	);

	// track.children.forEach(
	// 	(referenceNode) =>{
	// 		track.children.forEach(
	// 			(trackNode) =>{
	// 				if(checkCollisionBoxes(referenceNode.boundingBox,trackNode.boundingBox)){
	// 					referenceNode.state.collision.push(trackNode.id);
	// 					trackNode.state.collision.push(referenceNode.id);
						
	// 				}
	// 			}
	// 		)
	// 	}
	// );
};