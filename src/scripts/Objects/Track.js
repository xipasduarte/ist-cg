import { Group, TorusGeometry, MeshLambertMaterial, Mesh, Vector3, Box3 } from 'three';

const addCheerio = (group, x, y, z) => {
	const AABB = new Box3();
	const geometry = new TorusGeometry(0.75, 0.3, 5, 10);
	const material = new MeshLambertMaterial({color: 0xcccc00,wireframe: true});
	const cheerio = new Mesh(geometry, material);
	const mov = new Vector3();
	const position = new Vector3(x, y, z);

	cheerio.name = 'cheerio';
	cheerio.position.copy(position);
	cheerio.rotation.set(Math.PI/2,0,0);

	cheerio.state = {
		boundingBox: AABB,
		speed: 0,
		mov: mov,
		collision: [],
		initialPosition: position,
	};

	AABB.setFromObject(cheerio);

	group.add(cheerio);
}

const createSemiSphere = (group, x, y, z, radius, startingAngle, stepAngle, zScale) => {
	var newX=x;
	var newZ=z+radius;
	var theta = startingAngle;//Math.PI/2;
	var final_theta = 2*Math.PI-startingAngle;//3*Math.PI/2;
	if(final_theta<startingAngle){//if full turn
		final_theta = 4*Math.PI-startingAngle;
		newZ+=(-2)*radius;
	}

	while(theta<=final_theta){
		addCheerio(group, newX, y, newZ);
		theta+=stepAngle; //Math.PI/6
		newX=radius*Math.cos(theta)+x;
		newZ=radius*Math.sin(theta)*zScale;

	}
}

const createLine = (group, x, y, z, length, spacing) => {
	var newX = x + spacing;
	var max = x + length;

	while(newX < max){
		addCheerio(group, newX, y, z);
		newX+=spacing;
	}
}

export default (x, y, z) => {
	const track = new Group();
	track.name = 'track';
	//outer rim of track
	createSemiSphere(track, -30, 2, 0, 30, Math.PI/2, Math.PI/10, 1);	
	createSemiSphere(track, 30, 2, 0, 30, 3*Math.PI/2, Math.PI/10, 1);
	createLine(track, -30, 2, -30, 60, 10);
	createLine(track, -30, 2, 30, 60, 10);
	//inner rim of track
	createSemiSphere(track, -30, 2, 0, 15, Math.PI/2, Math.PI/6, 1);	
	createSemiSphere(track, 30, 2, 0, 15, 3*Math.PI/2, Math.PI/7, 1);
	createLine(track, -30, 2, -15, 60, 6);
	createLine(track, -30, 2, 15, 60, 6);
	return track;
}