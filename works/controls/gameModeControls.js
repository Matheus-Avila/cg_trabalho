import { GameMode } from '../util/constants.js';
import { degreesToRadians } from '../../libs/util/util.js';

var updateGameMode = function (keyboardState, gameMode, scene, camera, track, car, cameraHolder, timer, infoBox, plane, speedMeter) {
    if (keyboardState.down("space")) {
        if (gameMode == GameMode.Gameplay)
            gameMode = changeToInspectionMode(scene, camera, track, car, cameraHolder, timer, infoBox, plane, speedMeter);
        else if (gameMode == GameMode.Inspection)
            gameMode = changeToGameplayMode(scene, camera, track, car, cameraHolder, infoBox, plane);
    }

    return gameMode;
}

var changeToGameplayMode = function (scene, camera, track, car, cameraHolder, infoBox, plane) {
    scene.add(plane);
    scene.add(track.group);

    car.mesh.rotation.set(0, 0, degreesToRadians(180));
    car.mesh.position.set(track.initialBlockPosition[0], track.initialBlockPosition[1], 1.5);
    car.speed = 0;

    camera.position.set(0, 0, 0);
    camera.up.set(0.0, 0, 1.0);
    camera.lookAt(0.0, 0.0, 0.0);

    cameraHolder.add(camera);
    scene.add(cameraHolder);

    infoBox.clear();
    infoBox.showGameplayInfoBox();

    return GameMode.Gameplay;
}

var changeToInspectionMode = function (scene, camera, track, car, cameraHolder, timer, infoBox, plane, speedMeter) {
    scene.remove(plane);
    scene.remove(track.group);

    car.mesh.rotation.set(0, 0, 0);
    car.mesh.position.set(0.0, 0.0, 0.4);
    car.speed = 0;

    cameraHolder.remove(camera);
    scene.remove(cameraHolder);
    camera.position.set(7, 5, 7);

    timer.reset();
    timer.resetCrossedBlocks(track);

    infoBox.clear();
    infoBox.showInspectionInfoBox();
    
    speedMeter.reset();

    return GameMode.Inspection;
}

export { updateGameMode };