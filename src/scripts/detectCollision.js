import { Box3 } from 'three';

const checkColisionBoxes = (A,B) => {
	if(	A.boundingBox.max.x > B.boundingBox.min.x &&
	   	A.boundingBox.min.x < B.boundingBox.max.x &&
		A.boundingBox.max.y > B.boundingBox.min.y &&
		A.boundingBox.min.y < B.boundingBox.max.y &&
		A.boundingBox.max.z > B.boundingBox.min.z &&
		A.boundingBox.min.z < B.boundingBox.max.z
	  ){ return true}
	return false;

}
export default () => {
	const car = window.scene.getObjectByName('car');
	const oranges = window.scene.getObjectByName('oranges');
	const track = window.scene.getObjectByName('track');
	const butters = window.scene.getObjectByName('butters');
	const carBox = new Box3();
	carBox.setFromObject(car);

	oranges.children.forEach(
		(orange) =>{
			if(checkColisionBoxes(orange,car)){
				//endGame();
			}
		}
	)

	butters.children.forEach(
		(node) =>{
			if(checkColisionBoxes(node,car)){
				car.state.colision.push(node.id);
			}
		}
	)

	track.children.forEach(
		(node) =>{
			if(checkColisionBoxes(node,car)){
				console.log('colision');
				car.state.colision.push(node.id);
				node.state.colision.push(car.id);
			}
		}
	)

	track.children.forEach(
		(referenceNode) =>{
			track.children.forEach(
				(trackNode) =>{
					if(checkColisionBoxes(referenceNode,trackNode)){
						referenceNode.state.colision.push(trackNode.id);
						trackNode.state.colision.push(referenceNode.id);
						
					}
				}
			)
		}
	)


}