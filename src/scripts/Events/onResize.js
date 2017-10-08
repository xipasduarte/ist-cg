export default (e) => {
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (window.innerHeight === 0) {
    return;
  }

  if (camera.type === 'OrthographicCamera') {
    camera.left = window.innerWidth / -10;
    camera.right = window.innerWidth / 10;
    camera.top = window.innerHeight / 10;
    camera.bottom = window.innerHeight / -10;
  } else {
    camera.aspect = window.innerWidth / window.innerHeight;
  }
  
  camera.updateProjectionMatrix();
}
