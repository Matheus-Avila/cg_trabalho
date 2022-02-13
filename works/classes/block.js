import * as THREE from '../../build/three.module.js';
import { BlockType } from "../util/constants.js";

export class Block {
    constructor(width, height, depth, type, position, tex_track) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.type = type;
        this.boxGeometry = new THREE.BoxGeometry(this.width, this.height, this.depth);

        if (type == BlockType.Initial){
            this.material = new THREE.MeshPhongMaterial({ color: "rgba(90, 90, 90)"});
            this.crossed = true;
        }
        else {
            this.material = new THREE.MeshPhongMaterial({ color: "rgba(250, 250, 250)" });
            this.crossed = false;
        }
        var textureLoader = new THREE.TextureLoader();

        var block_texture  = textureLoader.load(tex_track);
        this.mesh = new THREE.Mesh(this.boxGeometry, this.material);
        this.mesh.material.map = block_texture;
        this.mesh.position.set(position[0], position[1], position[2]);
        this.mesh.receiveShadow = true;
    }
}