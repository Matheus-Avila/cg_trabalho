import * as THREE from '../../build/three.module.js';
import { Barrel } from '../classes/barrel.js';

export class BarrelList {
    constructor(positions) {
        this.group = new THREE.Group();
        for (let i = 0; i < positions.length; i++) {
            var barrel = new Barrel(positions[i]);
            this.blocks.push(barrel);
            this.group.add(barrel.mesh);
        }
    }
}