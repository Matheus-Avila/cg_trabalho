import * as THREE from '../../build/three.module.js';

export class Box {
    constructor(position) {
        this.width = 1.5;
        this.height = 1.5;
        this.depth = 1.5;
        this.boxGeometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        this.boxMaterial = new THREE.MeshPhongMaterial({
            color: "rgba(255, 255, 255)",
            side: THREE.DoubleSide,
        });
        var textureLoader = new THREE.TextureLoader();
        var box_texture  = textureLoader.load('textures/wood_box.jpg');
        this.mesh = new THREE.Mesh(this.boxGeometry, this.boxMaterial);
        this.mesh.receiveShadow = false;
        this.mesh.castShadow = true;
        this.mesh.material.map = box_texture;
        this.mesh.position.set(position[0], position[1], position[2]);
    }
}