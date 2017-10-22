import { Matrix4, Vector3} from 'three';

export default (delta) => {
	const track = scene.getObjectByName('track');

	track.children.forEach((cheerio) => {
		if (cheerio.state.speed === 0) {
			return;
		}

		if (cheerio.state.speed > 50){
			cheerio.state.speed = 50;
		}

		else if (cheerio.state.speed < 2) {
			cheerio.state.speed = 0;
			cheerio.state.mov = new Vector3();
		}
		
		cheerio.state.speed = cheerio.state.speed * delta * 0.8;
		cheerio.position.addScaledVector(cheerio.state.mov, cheerio.state.speed);
		cheerio.state.boundingBox.setFromObject(cheerio);
	});
};