export default () => {
    const car = window.scene.getObjectByName('car');
    const speedControl = document.getElementById('speed');

    speedControl.style.transform = "rotate(" + (Math.abs(Math.floor(car.state.speed)) * 240 / 50 - 210) + "deg)";
};