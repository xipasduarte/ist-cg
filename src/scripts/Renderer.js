import { WebGLRenderer } from 'three';

export default () => {
	const renderer = new WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);
	
  window.renderer = renderer;
}
