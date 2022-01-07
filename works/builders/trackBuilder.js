import { Track } from '../classes/track.js';

var buildTrack = function (scene, trackNumber) {
    if (trackNumber == 1)
        return buildFirstTrack(scene);
    else if (trackNumber == 2)
        return buildSecondTrack(scene);
}

var buildFirstTrack = function (scene) {
    var trackNumber = 1;
    var initialBlockPosition = [0, -30, -0.1];
    var commonBlockPositions = [
        [30, -30, -0.1],
        [20, -30, -0.1],
        [10, -30, -0.1],
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
        [40, -30, -0.1]
    ];
    var blockSize = 9.7;
    var blockDepth = 0.3;

    var track = new Track(trackNumber, initialBlockPosition, commonBlockPositions, blockSize, blockDepth);
    scene.add(track.group);

    return track;
}

var buildSecondTrack = function (scene) {
    var trackNumber = 2;
    var initialBlockPosition = [0, -30, -0.1];
    var commonBlockPositions = [
        [30, -30, -0.1],
        [20, -30, -0.1],
        [10, -30, -0.1],
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
        [40, -30, -0.1]
    ];
    var blockSize = 9.7;
    var blockDepth = 0.3;

    var track = new Track(trackNumber, initialBlockPosition, commonBlockPositions, blockSize, blockDepth);
    scene.add(track.group);

    return track;
}

export { buildTrack, buildFirstTrack, buildSecondTrack };