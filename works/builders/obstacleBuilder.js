import * as THREE from '../../build/three.module.js';
import { BoxList } from '../classes/boxesList.js';
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
        [-30, -30, 1],
        [-40, -30, 1],
        [-50, -30, 1],
        [-40, 60, 1],
        [-30, 60, 1],
        [-20, 60, 1],
        [-10, 60, 1],
        [0, 60, 1],
        [10, 60, 1],
        [20, 60, 1],
        [30, 60, 1],
        [40, 60, 1],
        [40, 40 , 1],
        [40, 20, 1],
        [40, 10, 1],
        [40, 0, 1]
    ];

    var positionsBoxes = [
        [-10, -30, 1],
        [-20, -30, 1],
        [-50, -20, 1],
        [-50, -10, 1],
        [-50, 0, 1],
        [-50, 10, 1],
        [-50, 20, 1],
        [-50, 30, 1],
        [-50, 40, 1],
        [-50, 50, 1],
        [40, 50, 1],
        [40, 30, 1],
        [40, -10, 1],
        [40, -20, 1],
        [40, -30, 1],
        [30, -30, 1],
        [20, -30, 1],
        [10, -30, 1]  
    ];

    var cones = new ConeList(positionsCones);
    var boxes = new BoxList(positionsBoxes);

    var obstacles = new THREE.Group();
    obstacles.add(cones.group);
    obstacles.add(boxes.group);

    scene.add(obstacles);

    return obstacles;
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

    var cones = new ConeList(positionsCones);
    var boxes = new BoxList(positionsBoxes);

    var obstacles = new THREE.Group();
    obstacles.add(cones.group);
    obstacles.add(boxes.group);

    scene.add(obstacles);

    return obstacles;
}

var buildThirdObstacles = function (scene) {
    var positionsCones = [
        [-20, 20, 1],
        [-30, 20, 1],
        [-50, 20, 1],
        [-50, 0, 1],
        [0, -30, 1],
        [10, -20, 1],
        [10, 0, 1],
        [10, 20, 1],
        [20, 30, 1],
        [40, 40, 1],
        [40, 60, 1]
    ];

    var positionsBoxes = [
        [10, 60, 1],
        [0, 60, 1], 
        [-10, 60, 1],
        [-20, 40, 1],
        [-50, -30, 1],
        [-20, -30, 1],
        [20, -30, 1],
        [30, -30, 1],
        [40, 0, 1],
        [40, 20, 1], 
        [40, 50, 1],
        [30, 60, 1] 
    ];

    var cones = new ConeList(positionsCones);
    var boxes = new BoxList(positionsBoxes);

    var obstacles = new THREE.Group();
    obstacles.add(cones.group);
    obstacles.add(boxes.group);

    scene.add(obstacles);

    return obstacles;
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

    var cones = new ConeList(positionsCones);
    var boxes = new BoxList(positionsBoxes);

    var obstacles = new THREE.Group();
    obstacles.add(cones.group);
    obstacles.add(boxes.group);

    scene.add(obstacles);

    return obstacles;
}

export { buildObstacles, buildFirstObstacles, buildSecondObstacles, buildThirdObstacles, buildFourthObstacles };