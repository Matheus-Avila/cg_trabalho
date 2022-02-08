import { Track } from '../classes/track.js';
import { degreesToRadians } from '../../libs/util/util.js';

var buildTrack = function (scene, car, trackNumber) {
    if (trackNumber == 1)
        return buildFirstTrack(scene, car);
    else if (trackNumber == 2)
        return buildSecondTrack(scene, car);
    else if (trackNumber == 3)
        return buildThirdTrack(scene, car);
    else if (trackNumber == 4)
        return buildFourthTrack(scene, car);
}

var buildFirstTrack = function (scene, car) {
    var trackNumber = 1;
    var initialBlockPosition = [0, -30, -0.1];
    var commonBlockPositions = [
        [-10, -30, -0.1],
        [-20, -30, -0.1],
        [-30, -30, -0.1],
        [-40, -30, -0.1],
        [-50, -30, -0.1],
        [-50, -20, -0.1],
        [-50, -10, -0.1],
        [-50, 0, -0.1],
        [-50, 10, -0.1],
        [-50, 20, -0.1],
        [-50, 30, -0.1],
        [-50, 40, -0.1],
        [-50, 50, -0.1],
        [-50, 60, -0.1],
        [-40, 60, -0.1],
        [-30, 60, -0.1],
        [-20, 60, -0.1],
        [-10, 60, -0.1],
        [0, 60, -0.1],
        [10, 60, -0.1],
        [20, 60, -0.1],
        [30, 60, -0.1],
        [40, 60, -0.1],
        [40, 50, -0.1],
        [40, 40 , -0.1],
        [40, 30, -0.1],
        [40, 20, -0.1],
        [40, 10, -0.1],
        [40, 0, -0.1],
        [40, -10, -0.1],
        [40, -20, -0.1],
        [40, -30, -0.1],
        [30, -30, -0.1],
        [20, -30, -0.1],
        [10, -30, -0.1]  
    ];
    var blockSize = 10;
    var blockDepth = 0.3;

    car.mesh.rotation.set(0, 0, degreesToRadians(180));

    var track = new Track(trackNumber, initialBlockPosition, commonBlockPositions, blockSize, blockDepth);
    scene.add(track.group);

    return track;
}

var buildSecondTrack = function (scene, car) {
    var trackNumber = 2;
    var initialBlockPosition = [0, -30, -0.1];
    var commonBlockPositions = [
        [-10, -30, -0.1],
        [-20, -30, -0.1],
        [-30, -30, -0.1],
        [-40, -30, -0.1],
        [-50, -30, -0.1],
        [-50, -20, -0.1],
        [-50, -10, -0.1],
        [-50, 0, -0.1],
        [-50, 10, -0.1],
        [-50, 20, -0.1],
        [-50, 30, -0.1],
        [-50, 40, -0.1],
        [-50, 50, -0.1],
        [-50, 60, -0.1],
        [-40, 60, -0.1],
        [-30, 60, -0.1],
        [-20, 60, -0.1],
        [-10, 60, -0.1],
        [-10, 50, -0.1],
        [-10, 40, -0.1],
        [-10, 30, -0.1],
        [-10, 20, -0.1],
        [0, 20, -0.1],
        [10, 20, -0.1],
        [20, 20, -0.1],
        [30, 20, -0.1],
        [40, 20, -0.1],
        [40, 10, -0.1],
        [40, 0, -0.1],
        [40, -10, -0.1],
        [40, -20, -0.1],
        [40, -30, -0.1],
        [30, -30, -0.1],
        [20, -30, -0.1],
        [10, -30, -0.1]
    ];
    var blockSize = 10;
    var blockDepth = 0.3;

    car.mesh.rotation.set(0, 0, degreesToRadians(180));

    var track = new Track(trackNumber, initialBlockPosition, commonBlockPositions, blockSize, blockDepth);
    scene.add(track.group);

    return track;
}

var buildThirdTrack = function (scene, car) {
    var trackNumber = 3;
    var initialBlockPosition =  [20, 60, -0.1];
    var commonBlockPositions = [
        [10, 60, -0.1],
        [0, 60, -0.1], //create elevation here
        [-10, 60, -0.1],
        [-20, 60, -0.1], 
        [-20, 50, -0.1],
        [-20, 40, -0.1],
        [-20, 30, -0.1],
        [-20, 20, -0.1],
        [-30, 20, -0.1],
        [-40, 20, -0.1],
        [-50, 20, -0.1],
        [-50, 10, -0.1],
        [-50, 0, -0.1],
        [-50, -10, -0.1],
        [-50, -20, -0.1],
        [-50, -30, -0.1],
        [-40, -30, -0.1],
        [-30, -30, -0.1],
        [-20, -30, -0.1],
        [-10, -30, -0.1],
        [0, -30, -0.1],
        [10, -30, -0.1],
        [10, -20, -0.1],
        [10, -10, -0.1],
        [10, 0, -0.1],
        [10, 10, -0.1],
        [10, 20, -0.1],
        [10, 30, -0.1],
        [20, 30, -0.1],
        [30, 30, -0.1], 
        [20, -30, -0.1],
        [30, -30, -0.1],
        [40, -30, -0.1],
        [40, -20, -0.1],
        [40, -10, -0.1],
        [40, 0, -0.1],
        [40, 10, -0.1], 
        [40, 20, -0.1], 
        [40, 30, -0.1],
        [40, 40, -0.1],
        [40, 50, -0.1],
        [40, 60, -0.1],
        [30, 60, -0.1] //create elevation here
    ];
    var blockSize = 10;
    var blockDepth = 0.3;

    car.mesh.rotation.set(0, 0, degreesToRadians(180));

    var track = new Track(trackNumber, initialBlockPosition, commonBlockPositions, blockSize, blockDepth);
    scene.add(track.group);

    return track;
}

var buildFourthTrack = function (scene, car) {
    var trackNumber = 4;
    var initialBlockPosition =  [-50, 0, -0.1];
    var commonBlockPositions = [
        [-50, 10, -0.1],
        [-40, 10, -0.1],
        [-30, 10, -0.1],
        [-20, 10, -0.1],
        [-10, 10, -0.1],
        [0, 10, -0.1],
        [10, 10, -0.1],
        [10, 20, -0.1],
        [10, 40, -0.1],
        [10, 50, -0.1],
        [10, 60, -0.1],
        [20, 60, -0.1],
        [30, 60, -0.1],
        [40, 60, -0.1],
        [40, 50, -0.1],
        [40, 40, -0.1],
        [40, 30, -0.1],
        [30, 30, -0.1],
        [20, 30, -0.1], //create elevation here
        [10, 30, -0.1],
        [0, 30, -0.1],
        [-10, 30, -0.1],
        [-10, 20, -0.1], //create elevation here
        [-10, 0, -0.1],       
        [-10, -10, -0.1],
        [-10, -20, -0.1],
        [-10, -30, -0.1],
        [-20, -30, -0.1],
        [-30, -30, -0.1],
        [-40, -30, -0.1],   
        [-50, -30, -0.1],
        [-50, -20, -0.1],
        [-50, -10, -0.1]
    ];
    var blockSize = 10;
    var blockDepth = 0.3;

    car.mesh.rotation.set(0, 0, degreesToRadians(90));

    var track = new Track(trackNumber, initialBlockPosition, commonBlockPositions, blockSize, blockDepth);
    scene.add(track.group);

    return track;
}

export { buildTrack, buildFirstTrack, buildSecondTrack, buildThirdTrack, buildFourthTrack };