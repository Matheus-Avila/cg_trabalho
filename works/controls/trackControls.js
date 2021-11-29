import * as TrackBuilder from '../builders/trackBuilder.js';
import { degreesToRadians } from '../../libs/util/util.js';

var updateTrack = function (keyboardState, scene, track, car, timer) {
    if (keyboardState.down("1") && track.number == 2)
        track = changeTrack(scene, track, car, 1, timer);
    else if (keyboardState.down("2") && track.number == 1)
        track = changeTrack(scene, track, car, 2, timer);

    return track;
}

var changeTrack = function (scene, track, car, newTrackNumber, timer) {
    scene.remove(track.group);
    track = TrackBuilder.buildTrack(scene, newTrackNumber);

    car.mesh.rotation.set(0, 0, degreesToRadians(180));
    car.mesh.position.setX(track.initialBlockPosition[0]);
    car.mesh.position.setY(track.initialBlockPosition[1]);
    car.speed = 0;

    timer.reset();
    timer.resetCrossedBlocks(track);

    return track;
}

export { updateTrack };