import * as THREE from '../../build/three.module.js';
import { Box } from '../classes/box.js';

export class BoxList {
    constructor(positions) {
        this.group = new THREE.Group();
        for (let i = 0; i < positions.length; i++) {
            var box = new Box(positions[i]);
            this.blocks.push(box);
            this.group.add(box.mesh);
        }
    }
}