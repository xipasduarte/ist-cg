export default (e) => {
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (window.innerHeight === 0) {
    return;
  }
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
