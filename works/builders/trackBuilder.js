import { Track } from '../classes/track.js';

var buildFirstTrack = function (scene, blockSize, blockDepth) {
    var initialBlockPosition = [0, 0, -0.1];
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

    var track = new Track(initialBlockPosition, commonBlockPositions, blockSize, blockDepth);
    scene.add(track.group);

    return track;
}

var buildSecondTrack = function (scene, blockSize, blockDepth) {
    var initialBlockPosition = [0, 0, -0.1];
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
        [0, 30, -0.1],
        [0, 20, -0.1],
        [10, 20, -0.1],
        [20, 20, -0.1],
        [20, 10, -0.1],
        [20, 0, -0.1]
    ];

    var track = new Track(initialBlockPosition, commonBlockPositions, blockSize, blockDepth);
    scene.add(track.group);

    return track;
}

export { buildFirstTrack, buildSecondTrack };