import { Block } from '../classes/block.js';

var buildTrack = function (scene, blockSize, blockDepth) {
    var blocks = [];
    var commonBlockPositions = [
        [10, 0, -0.1],
        [20, 0, -0.1],
        [-10, 0, -0.1],
        [-20, 0, -0.1],
        [-20, 10, -0.1],
        [-20, 20, -0.1],
        [-20, 30, -0.1],
        [-20, 40, -0.1],
        [-10, 40, -0.1],
        [0, 40, -0.1],
        [10, 40, -0.1],
        [20, 40, -0.1],
        [20, 30, -0.1],
        [20, 20, -0.1],
        [20, 10, -0.1],
        [20, 0, -0.1]
    ];

    var initialBlockPosition = [0, 0, -0.1];
    var initialBlock = new Block(blockSize, blockSize, blockDepth, "initial", initialBlockPosition);
    scene.add(initialBlock.mesh);
    blocks.push(initialBlock);

    for (let i = 0; i < commonBlockPositions.length; i++) {
        var commonBlock = new Block(blockSize, blockSize, blockDepth, "common", commonBlockPositions[i]);
        blocks.push(commonBlock);
        scene.add(commonBlock.mesh);
    }

    return blocks;
}

export { buildTrack };