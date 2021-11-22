import * as THREE from '../../build/three.module.js';
import { Block } from '../classes/block.js';

export class Track {
    constructor(initialBlockPosition, commonBlockPositions, blockSize, blockDepth) {
        this.blocks = [];
        this.group = new THREE.Group();
        this.blockSize = blockSize;

        var initialBlock = new Block(blockSize, blockSize, blockDepth, "initial", initialBlockPosition);
        this.group.add(initialBlock.mesh);
        this.blocks.push(initialBlock);

        for (let i = 0; i < commonBlockPositions.length; i++) {
            var commonBlock = new Block(blockSize, blockSize, blockDepth, "common", commonBlockPositions[i]);
            this.blocks.push(commonBlock);
            this.group.add(commonBlock.mesh);
        }
    }
}