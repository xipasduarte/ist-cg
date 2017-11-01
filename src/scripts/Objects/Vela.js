import { PointLight, Sprite, SpriteMaterial, CylinderGeometry, MeshLambertMaterial, Mesh, Group} from 'three';

const createLight = (x, y, z) =>{
	const light = new PointLight(0xffffff, 2, 60, 2);

	light.position.set(x, y, z);

	light.shadow.mapSize.width = 512;  // default
	light.shadow.mapSize.height = 512; // default
	light.shadow.camera.near = 0.5;       // default
	light.shadow.camera.far = 500      // default

	// var sprite = new Sprite( new SpriteMaterial( { color: 0xffffff} ) );
	// light.add(sprite);
	return light;

}
export default () => {
	const velas = new Group();
	velas.name = 'Velas';

	velas.add(
		createLight(45,5,20),
	    createLight(-45,5,20),
	    createLight(-45,5,-20),
	    createLight(45,5,-20),
	    createLight(0, 5, 20),
	    createLight(0, 5, -20)

	);
	return velas;

	// const lightBodyGeometry = new CylinderGeometry(0.5, 0.5, 2, 20, 32);
	// const material = new MeshLambertMaterial( { color: 0xffffff, wireframe: window.game.state.wireframe} );
	// const lightBody = new Mesh(lightBodyGeometry, material);
	// console.log(x);
	// console.log(y);
	// console.log(z);
	// lightBody.position.set(0, -3, 0);
	// lightBody.emissive = 0xffffff;
	// console.log(lightBody.position);
	// lightBody.receiveShadow = true;
	// lightBody.castShadow = true; 
	// light.add(lightBody);
	return light;
}
