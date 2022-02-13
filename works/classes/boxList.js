import * as THREE from '../../build/three.module.js';
import { Box } from './box.js';

export class BoxList {
    constructor(positions) {
        this.group = new THREE.Group();
        this.boxes = [];
        this.boundingBoxGroup = new THREE.Group();

        for (let i = 0; i < positions.length; i++) {
            var box = new Box(positions[i]);
            this.boxes.push(box);
            this.group.add(box.mesh);

            var bbox = new THREE.BoundingBoxHelper(box.mesh, 0xffffff);
            bbox.update();
            this.boundingBoxGroup.add(bbox);
        }
    }
}