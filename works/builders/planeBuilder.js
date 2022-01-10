import * as THREE from '../../build/three.module.js';

var buildPlane = function (scene) {
    var planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    planeGeometry.translate(0.0, 0.0, -0.3);
    var planeMaterial = new THREE.MeshPhongMaterial({
        color: "rgba(150, 150, 150)",
        side: THREE.DoubleSide,
    }); 
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);   
    plane.receiveShadow = true;

    scene.add(plane);
    return plane;
}

export { buildPlane };