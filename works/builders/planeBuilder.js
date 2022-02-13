import * as THREE from '../../build/three.module.js';

var buildPlane = function (scene, texture) {
    var side = 2000;
    var textureLoader = new THREE.TextureLoader();
    var plane_texture  = textureLoader.load(texture);
    var planeGeometry = new THREE.PlaneGeometry(side, side);
    planeGeometry.translate(0.0, 0.0, -0.3);
    var planeMaterial = new THREE.MeshPhongMaterial({
        color: "rgba(250, 250, 250)",
        side: THREE.DoubleSide,
    }); 
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);   
    plane.receiveShadow = true;
    plane.material.map = plane_texture;
    plane.material.map.repeat.set(side/10,side/10);
    plane.material.map.wrapS = 'Repeat';
    plane.material.map.wrapT = 'Repeat';
    scene.add(plane);
    return plane;
}

export { buildPlane };