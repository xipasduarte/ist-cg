import { Matrix4, Vector3} from 'three';

export default (delta) => {
	const track = scene.getObjectByName('track');

	track.children.forEach((cheerio) => {
		if (cheerio.state.speed === 0) {
			return;
		}

		if (cheerio.state.speed > 5){
			cheerio.state.speed = 5;
		}

		else if (cheerio.state.speed < 0.5) {
			cheerio.state.speed = 0;
			cheerio.state.mov = new Vector3();
		}
		
		cheerio.state.speed = cheerio.state.speed * 0.8 - 2*delta;
		cheerio.position.addScaledVector(cheerio.state.mov, cheerio.state.speed);
		cheerio.state.boundingBox.setFromObject(cheerio);
	});
};