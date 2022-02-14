import { BoxList } from '../classes/boxList.js';
import { ConeList } from '../classes/coneList.js';

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
    var positionsCones = [    
        [-44, -34, 1],
        [-44, -32, 1],
        [-45, -30, 1],
        [-46, 55, 1],
        [-47, 57, 1],
        [-20, 57, 1],
        [-18, 59, 1],
        [20, 60, 1],
        [28, 56, 1],
        [24, 60, 1],
        [43, 60, 1],
        [43, 55, 1],
        [38, 44, 1],
        [44, 23, 1],
        [37, 12, 1],
        [44, 7, 1]
    ];

    var positionsBoxes = [
        [-8, -33, 1],
        [-8, -27, 1],
        [-20, -31, 1],
        [-35, -27, 1],
        [-52, -15, 1],
        [-50, -7, 1],
        [-48, 10, 1],
        [-51, 39, 1],
        [-53, 53, 1],
        [-30, 62, 1],
        [15, 57, 1],
        [38, 62, 1],
        [43, 30, 1],
        [41, -10, 1],
        [36, -27, 1],
        [30, -34, 1],
        [20, -28, 1],
        [10, -32, 1]  
    ];

    var coneList = new ConeList(positionsCones);
    var boxList = new BoxList(positionsBoxes);

    scene.add(coneList.group);
    scene.add(boxList.group);

    //scene.add(coneList.boundingBoxGroup);
    //scene.add(boxList.boundingBoxGroup);

    return {coneList, boxList};
}

var buildSecondObstacles = function (scene) {
    var positionsCones = [
        [-10, -30, 1],
        [-20, -30, 1],
        [-40, -30, 1],
        [-30, 60, 1],
        [-10, 50, 1],
        [-10, 40, 1],
        [-10, 20, 1],
        [0, 20, 1],
        [40, -30, 1],
        [20, -30, 1]
    ];

    var positionsBoxes = [
        [-50, -20, 1],
        [-50, -10, 1],
        [-50, 0, 1],
        [-50, 60, 1],
        [10, 20, 1],
        [40, 20, 1],
        [40, 0, 1],
        [40, -10, 1],
        [40, -20, 1],
        [30, -30, 1],
        [10, -30, 1]
    ];

    var coneList = new ConeList(positionsCones);
    var boxList = new BoxList(positionsBoxes);

    scene.add(coneList.group);
    scene.add(boxList.group);

    return {coneList, boxList};
}

var buildThirdObstacles = function (scene) {
    var positionsCones = [
        [-25, 20, 1],
        [-25, 18, 1],
        [-25, 16, 1],
        [-50, 0, 1],
        [0, -30, 1],
        [10, -20, 1],
        [10, 0, 1],
        [10, 33, 1],
        [20, 28, 1],
        [30, 32, 1],
        [10, -10, 1]
    ];

    var positionsBoxes = [
        [10, 56, 1],
        [0, 62, 1], 
        [-10, 56, 1],
        [-20, 61, 1],
        [-50, -25, 1],
        [-20, -28, 1],
        [25, -28, 1],
        [30, -33, 1],
        [37, 10, 1],
        [43, 20, 1], 
        [38, 40, 1],
        [30, 61, 1] 
    ];

    var coneList = new ConeList(positionsCones);
    var boxList = new BoxList(positionsBoxes);

    scene.add(coneList.group);
    scene.add(boxList.group);

    return {coneList, boxList};
}

var buildFourthObstacles = function (scene) {
    var positionsCones = [
        [10, 10, 1],
        [10, 20, 1],
        [10, 50, 1],
        [10, 60, 1],
        [20, 60, 1],
        [40, 60, 1],
        [-10, 20, 1],    
        [-10, -10, 1],
        [-10, -20, 1],
        [-20, -30, 1]
    ];

    var positionsBoxes = [
        [-50, 10, 1],
        [-40, 10, 1],
        [-10, 10, 1],
        [0, 10, 1],
        [40, 40, 1],
        [20, 30, 1],
        [10, 30, 1],
        [-50, -30, 1],
        [-50, -20, 1],
        [-50, -10, 1]
    ];

    var coneList = new ConeList(positionsCones);
    var boxList = new BoxList(positionsBoxes);

    scene.add(coneList.group);
    scene.add(boxList.group);

    return {coneList, boxList};
}

export { buildObstacles, buildFirstObstacles, buildSecondObstacles, buildThirdObstacles, buildFourthObstacles };