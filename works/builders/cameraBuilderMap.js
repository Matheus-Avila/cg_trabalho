import * as THREE from '../../build/three.module.js';

var buildCameraMap = function () {
    var vcWidth = 400;
    var vcHeidth = 300;
    var camPosition = new THREE.Vector3(0,0,90);
    var upVec = new THREE.Vector3(1.0, 0, 1.0);
    var lookAtVec = new THREE.Vector3(0.0, 0.0, 0.0);

    var camera = new THREE.PerspectiveCamera(80, vcWidth / vcHeidth, 0.1, 8000.0);
    camera.position.copy(camPosition);
    camera.up.copy(upVec);
    camera.lookAt(lookAtVec);

    return camera;
}

export { buildCameraMap };