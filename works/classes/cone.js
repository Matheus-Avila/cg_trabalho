import * as THREE from '../../build/three.module.js';

export class Cone {
    constructor(position) {
    var base = 1;
    var height = 2;
    var textureLoader = new THREE.TextureLoader();
    var cone_texture  = textureLoader.load('textures/wood.png');
    var coneGeometry = new THREE.ConeGeometry(base, height, 32);
    var coneMaterial = new THREE.MeshPhongMaterial({
        color: "rgba(255, 255, 255)",
        side: THREE.DoubleSide,
    }); 
    this.mesh = new THREE.Mesh(coneGeometry, coneMaterial);   
    this.mesh.receiveShadow = false;
    this.mesh.castShadow = true;
    this.mesh.material.map = cone_texture;
    this.mesh.rotateX(Math.PI/2);
    this.mesh.position.set(position[0], position[1], position[2]);
    }
}