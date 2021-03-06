import * as THREE from '../../build/three.module.js';
import { Block } from '../classes/block.js';
import { BlockType } from "../util/constants.js";

export class Track {
    constructor(number, initialBlockPosition, commonBlockPositions, blockSize, blockDepth, blockTexture, coneList, boxList, plane) {
        this.initialBlockPosition = initialBlockPosition;
        this.number = number;
        this.blockSize = blockSize;
        this.blockDepth = blockDepth;
        this.plane = plane;

        this.blocks = [];
        this.group = new THREE.Group();

        var initialBlock = new Block(blockSize, blockSize, blockDepth, BlockType.Initial, initialBlockPosition, blockTexture);
        this.blocks.push(initialBlock);
        this.group.add(initialBlock.mesh);

        for (let i = 0; i < commonBlockPositions.length; i++) {
            var commonBlock = new Block(blockSize, blockSize, blockDepth, BlockType.Common, commonBlockPositions[i], blockTexture);
            this.blocks.push(commonBlock);
            this.group.add(commonBlock.mesh);
        }

        this.cones = coneList.cones;
        this.boxes = boxList.boxes;
        this.group.add(coneList.group);
        this.group.add(boxList.group);
    }
}