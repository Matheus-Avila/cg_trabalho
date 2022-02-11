import * as TrackBuilder from '../builders/trackBuilder.js';
import * as obstacleBuilder from '../builders/obstacleBuilder.js';
import { degreesToRadians } from '../../libs/util/util.js';

var updateTrack = function (keyboardState, scene, track, car, timer, speedMeter) {
    if (keyboardState.down("1") && track.number != 1)
        track = changeTrack(scene, track, car, 1, timer, speedMeter);
    else if (keyboardState.down("2") && track.number != 2)
        track = changeTrack(scene, track, car, 2, timer, speedMeter);
    else if (keyboardState.down("3") && track.number != 3)
        track = changeTrack(scene, track, car, 3, timer, speedMeter);
    else if (keyboardState.down("4") && track.number != 4)
        track = changeTrack(scene, track, car, 4, timer, speedMeter);
    return track;
}

var changeTrack = function (scene, track, car, newTrackNumber, timer, speedMeter) {
    scene.remove(track.group);
    track = TrackBuilder.buildTrack(scene, newTrackNumber);
    obstacleBuilder.buildObstacles(scene, newTrackNumber);
    
    if(newTrackNumber == 4)
        car.mesh.rotation.set(0, 0, degreesToRadians(90));
    else
        car.mesh.rotation.set(0, 0, degreesToRadians(180));

    car.mesh.position.setX(track.initialBlockPosition[0]);
    car.mesh.position.setY(track.initialBlockPosition[1]);
    car.speed = 0;

    timer.reset();
    timer.resetCrossedBlocks(track);

    speedMeter.reset();

    return track;
}

export { updateTrack };