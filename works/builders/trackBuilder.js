import { Track } from '../classes/track.js';

var buildTrack = function (scene, trackNumber) {
    if (trackNumber == 1)
        return buildFirstTrack(scene);
    else if (trackNumber == 2)
        return buildSecondTrack(scene);
}

var buildFirstTrack = function (scene) {
    var trackNumber = 1;
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
    var blockSize = 9.7;
    var blockDepth = 0.3;

    var track = new Track(trackNumber, initialBlockPosition, commonBlockPositions, blockSize, blockDepth);
    scene.add(track.group);

    return track;
}

var buildSecondTrack = function (scene) {
    var trackNumber = 2;
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
    var blockSize = 9.7;
    var blockDepth = 0.3;

    var track = new Track(trackNumber, initialBlockPosition, commonBlockPositions, blockSize, blockDepth);
    scene.add(track.group);

    return track;
}

export { buildTrack, buildFirstTrack, buildSecondTrack };