import * as THREE from '../../build/three.module.js';
import { Cone } from '../classes/cone.js';

export class ConeList {
    constructor(positions) {
        this.group = new THREE.Group();
        this.cones = [];
        this.boundingBoxGroup = new THREE.Group();
        
        for (let i = 0; i < positions.length; i++) {
            var cone = new Cone(positions[i]);
            this.cones.push(cone);
            this.group.add(cone.mesh);

            var bbox = new THREE.BoundingBoxHelper(cone.mesh, 0xffffff);
            bbox.update();
            this.boundingBoxGroup.add(bbox);
        }
    }
}