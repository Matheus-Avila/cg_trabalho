import * as THREE from '../../build/three.module.js';
import { Cone } from '../classes/cone.js';

export class ConeList {
    constructor(positions) {
        this.group = new THREE.Group();
        this.cones = [];
        for (let i = 0; i < positions.length; i++) {
            var cone = new Cone(positions[i]);
            this.cones.push(cone);
            this.group.add(cone.mesh);
        }
    }
}