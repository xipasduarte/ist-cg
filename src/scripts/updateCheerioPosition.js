import { Matrix4, Vector3} from 'three';

export default () => {
	const track = scene.getObjectByName('track');
	const delta = clock.getDelta();

	track.children.forEach(
		(cheerio) => {
			if(cheerio.state.speed === 0){return;}
			if(cheerio.state.speed > 1){
				cheerio.state.speed = 1;
			}
			else if(cheerio.state.speed <0.10){
				cheerio.state.speed = 0;
				cheerio.state.mov = new Vector3(0,0,0);
			}
			cheerio.state.speed = cheerio.state.speed - 100 * delta;
			updateSpeedPosition(cheerio,delta);
			cheerio.state.boundingBox.setFromObject(cheerio);
		}
	)
}

const updateSpeedPosition = (cheerio, delta) => {
  const matrix = new Matrix4();

  matrix.setPosition(cheerio.state.mov.multiplyScalar(cheerio.state.speed));
  cheerio.applyMatrix(matrix);

};