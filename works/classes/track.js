import * as THREE from '../../build/three.module.js';
import { Block } from '../classes/block.js';

export class Track {
    constructor(number, initialBlockPosition, commonBlockPositions, blockSize, blockDepth) {
        this.initialBlockPosition = initialBlockPosition;
        this.number = number;
        this.blockSize = blockSize;
        this.blockDepth = blockDepth;
        this.blocks = [];
        this.group = new THREE.Group();

        var initialBlock = new Block(blockSize, blockSize, blockDepth, "initial", initialBlockPosition);
        this.blocks.push(initialBlock);
        this.group.add(initialBlock.mesh);

        for (let i = 0; i < commonBlockPositions.length; i++) {
            var commonBlock = new Block(blockSize, blockSize, blockDepth, "common", commonBlockPositions[i]);
            this.blocks.push(commonBlock);
            this.group.add(commonBlock.mesh);
        }
    }
}