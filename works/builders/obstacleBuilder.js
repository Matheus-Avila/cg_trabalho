import * as THREE from '../../build/three.module.js';
import { BoxList } from '../classes/boxesList.js';
import { BarrelList } from '../classes/barrelsList.js';

var buildObstacles = function (scene, trackNumber) {
    if (trackNumber == 1)
        return buildFirstObstacles(scene);
    else if (trackNumber == 2)
        return buildSecondObstacles(scene);
    else if (trackNumber == 3)
        return buildThirdObstacles(scene);
    else if (trackNumber == 4)
        return buildFourthObstacles(scene);
}

var buildFirstObstacles = function (scene) {
    var positionsBarrels = [
        [-10, -30, 2],
        [-20, -30, 2],
        [-30, -30, 2],
        [-40, -30, 2],
        [-50, -30, 2],
        [-50, -20, 2],
        [-50, -10, 2],
        [-50, 0, 2],
        [-50, 10, 2],
        [-50, 20, 2],
        [-50, 30, 2],
        [-50, 40, 2],
        [-50, 50, 2],
        [-50, 60, 2],
        [-40, 60, 2],
        [-30, 60, 2],
        [-20, 60, 2],
        [-10, 60, 2],
        [0, 60, 2],
        [10, 60, 2],
        [20, 60, 2],
        [30, 60, 2],
        [40, 60, 2],
        [40, 50, 2],
        [40, 40 , 2],
        [40, 30, 2],
        [40, 20, 2],
        [40, 10, 2],
        [40, 0, 2],
        [40, -10, 2],
        [40, -20, 2],
        [40, -30, 2],
        [30, -30, 2],
        [20, -30, 2],
        [10, -30, 2]  
    ];

    var barrels = new BarrelList(positionsBarrels);
    scene.add(barrels.group);

    return track;
}

var buildSecondObstacles = function (scene) {
    
    var positionsBarrels = [
        [-10, -30, 2],
        [-20, -30, 2],
        [-30, -30, 2],
        [-40, -30, 2],
        [-50, -30, 2],
        [-50, -20, 2],
        [-50, -10, 2],
        [-50, 0, 2],
        [-50, 10, 2],
        [-50, 20, 2],
        [-50, 30, 2],
        [-50, 40, 2],
        [-50, 50, 2],
        [-50, 60, 2],
        [-40, 60, 2],
        [-30, 60, 2],
        [-20, 60, 2],
        [-10, 60, 2],
        [-10, 50, 2],
        [-10, 40, 2],
        [-10, 30, 2],
        [-10, 20, 2],
        [0, 20, 2],
        [10, 20, 2],
        [20, 20, 2],
        [30, 20, 2],
        [40, 20, 2],
        [40, 10, 2],
        [40, 0, 2],
        [40, -10, 2],
        [40, -20, 2],
        [40, -30, 2],
        [30, -30, 2],
        [20, -30, 2],
        [10, -30, 2]
    ];
    var blockSize = 10;
    var blockDepth = 0.3;

    var track = new Obstacles(trackNumber, initialBlockPosition, commonBlockPositions, blockSize, blockDepth);
    scene.add(track.group);

    return track;
}

var buildThirdObstacles = function (scene) {
    var trackNumber = 3;
    var initialBlockPosition =  [20, 60, 2];
    var commonBlockPositions = [
        [10, 60, 2],
        [0, 60, 2], //create elevation here
        [-10, 60, 2],
        [-20, 60, 2], 
        [-20, 50, 2],
        [-20, 40, 2],
        [-20, 30, 2],
        [-20, 20, 2],
        [-30, 20, 2],
        [-40, 20, 2],
        [-50, 20, 2],
        [-50, 10, 2],
        [-50, 0, 2],
        [-50, -10, 2],
        [-50, -20, 2],
        [-50, -30, 2],
        [-40, -30, 2],
        [-30, -30, 2],
        [-20, -30, 2],
        [-10, -30, 2],
        [0, -30, 2],
        [10, -30, 2],
        [10, -20, 2],
        [10, -10, 2],
        [10, 0, 2],
        [10, 10, 2],
        [10, 20, 2],
        [10, 30, 2],
        [20, 30, 2],
        [30, 30, 2], 
        [20, -30, 2],
        [30, -30, 2],
        [40, -30, 2],
        [40, -20, 2],
        [40, -10, 2],
        [40, 0, 2],
        [40, 10, 2], 
        [40, 20, 2], 
        [40, 30, 2],
        [40, 40, 2],
        [40, 50, 2],
        [40, 60, 2],
        [30, 60, 2] //create elevation here
    ];
    var blockSize = 10;
    var blockDepth = 0.3;

    var track = new Obstacles(trackNumber, initialBlockPosition, commonBlockPositions, blockSize, blockDepth);
    scene.add(track.group);

    return track;
}

var buildFourthObstacles = function (scene) {
    var trackNumber = 4;
    var initialBlockPosition =  [-50, 0, 2];
    var commonBlockPositions = [
        [-50, 10, 2],
        [-40, 10, 2],
        [-30, 10, 2],
        [-20, 10, 2],
        [-10, 10, 2],
        [0, 10, 2],
        [10, 10, 2],
        [10, 20, 2],
        [10, 40, 2],
        [10, 50, 2],
        [10, 60, 2],
        [20, 60, 2],
        [30, 60, 2],
        [40, 60, 2],
        [40, 50, 2],
        [40, 40, 2],
        [40, 30, 2],
        [30, 30, 2],
        [20, 30, 2], //create elevation here
        [10, 30, 2],
        [0, 30, 2],
        [-10, 30, 2],
        [-10, 20, 2], //create elevation here
        [-10, 0, 2],       
        [-10, -10, 2],
        [-10, -20, 2],
        [-10, -30, 2],
        [-20, -30, 2],
        [-30, -30, 2],
        [-40, -30, 2],   
        [-50, -30, 2],
        [-50, -20, 2],
        [-50, -10, 2]
    ];
    var blockSize = 10;
    var blockDepth = 0.3;

    var track = new Obstacles(trackNumber, initialBlockPosition, commonBlockPositions, blockSize, blockDepth);
    scene.add(track.group);

    return track;
}

export { buildObstacles, buildFirstObstacles, buildSecondObstacles, buildThirdObstacles, buildFourthObstacles };