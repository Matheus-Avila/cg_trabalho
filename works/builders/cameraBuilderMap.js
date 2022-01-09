import * as THREE from '../../build/three.module.js';

var buildCameraMap = function () {
    var vcWidth = 400;
    var vcHeidth = 340;
    var camPosition = new THREE.Vector3(-5.0, 5.0, 70.0);
    var upVec = new THREE.Vector3(1.0, 0, 1.0);
    var lookAtVec = new THREE.Vector3(-5.0, 5.0, 0.0);

    var camera = new THREE.PerspectiveCamera(75.0, vcWidth / vcHeidth, 5, 8000.0);
    camera.position.copy(camPosition);
    camera.up.copy(upVec);
    camera.lookAt(lookAtVec);

    return camera;
}

export { buildCameraMap };