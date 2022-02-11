import * as THREE from '../../build/three.module.js';

export class Barrel {
    constructor(base, middle, height, position) {
    var textureLoader = new THREE.TextureLoader();
    var barrel_texture  = textureLoader.load('../textures/wood_box.jpg');
    var barrelBottomGeometry = new THREE.CylinderGeometry(base, middle, height/2, 32);
    var barrelBottomMaterial = new THREE.MeshPhongMaterial({
        color: "rgba(150, 150, 150)",
        side: THREE.DoubleSide,
    }); 
    var barrelBottom = new THREE.Mesh(barrelBottomGeometry, barrelBottomMaterial);   
    barrelBottom.receiveShadow = true;
    barrelBottom.material.map = barrel_texture;

    var barrelTopGeometry = new THREE.CylinderGeometry(middle, base, height/2, 32);
    barrelTopGeometry.translate(0.0, 0.0, 2);
    var barrelTopMaterial = new THREE.MeshPhongMaterial({
        color: "rgba(150, 150, 150)",
        side: THREE.DoubleSide,
    }); 
    var barrelTop = new THREE.Mesh(barrelTopGeometry, barrelTopMaterial);   
    barrelTop.receiveShadow = true;
    barrelTop.material.map = barrel_texture;

    barrelBottom.add(barrelTop);
    this.barrelBottom.position.set(position[0], position[1], position[2]);
    }
}