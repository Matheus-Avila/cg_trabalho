import * as THREE from '../../build/three.module.js';

export class Box {
    constructor(width, height, depth, position) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.boxGeometry = new THREE.BoxGeometry(this.width, this.height, this.depth);

        var textureLoader = new THREE.TextureLoader();

        var box_texture  = textureLoader.load('../textures/wood_box.jpg');
        this.mesh = new THREE.Mesh(this.boxGeometry, this.material);
        this.mesh.material.map = box_texture;
        this.mesh.position.set(position[0], position[1], position[2]);
        this.mesh.receiveShadow = true;
    }
}