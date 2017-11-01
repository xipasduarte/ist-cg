import { WebGLRenderer, PCFSoftShadowMap} from 'three';

export default () => {
	const renderer = new WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	
  window.renderer = renderer;
}
