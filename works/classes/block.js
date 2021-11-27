import * as THREE from '../../build/three.module.js';

export class Block {
    constructor(width, height, depth, type, position) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.type = type;
        this.boxGeometry = new THREE.BoxGeometry(this.width, this.height, this.depth);

        if (type == "initial"){
            this.material = new THREE.MeshPhongMaterial({ color: "rgba(250, 10, 150)" });
            this.crossed = 'true';
        }
        else{
            this.material = new THREE.MeshPhongMaterial({ color: "rgba(250, 150, 250)" });
            this.crossed = 'false';
        }
        this.mesh = new THREE.Mesh(this.boxGeometry, this.material);
        this.mesh.position.set(position[0], position[1], position[2]);
    }
}