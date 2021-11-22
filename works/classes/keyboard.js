import KeyboardState from '../../libs/util/KeyboardState.js';
import * as TrackBuilder from '../builders/trackBuilder.js';
import { degreesToRadians } from '../../libs/util/util.js';

export class Keyboard {
    constructor() {
        this.keyboardState = new KeyboardState();
    }

    update = function () {
        this.keyboardState.update();
    }

    onMovementKeyPressed = function (car, track) {
        if (this.keyboardState.pressed("left"))
            car.mesh.rotateZ(.05);

        if (this.keyboardState.pressed("right"))
            car.mesh.rotateZ(-.05);

        if (this.keyboardState.pressed("X")) {
            if (car.speed < car.maxSpeed)
                car.speed = car.speed + 0.01;

            if (!this.#carIsOnTrack(car.mesh, track))
                car.speed = car.speed * 0.5;

            car.mesh.translateX(car.speed);
        }

        if (!this.keyboardState.pressed("X")) {
            if (car.speed > 0) {
                if (!this.#carIsOnTrack(car.mesh, track))
                    car.speed = car.speed * 0.5;

                car.speed = car.speed - 0.01;
                car.mesh.translateX(car.speed);
            }
        }

        if (this.keyboardState.pressed("down")) {
            if (!this.#carIsOnTrack(car.mesh, track))
                car.speed = car.speed * 0.5;

            if (car.speed > 0)
                car.speed = .95 * car.speed;
            else
                car.mesh.translateX(-.08);
        }
    }

    onChangeTrackKeyPressed = function (car, track, scene) {
        if (this.keyboardState.pressed("1") && track.number == 2)
            track = this.#changeTrack(car, track, scene, 1);
        else if (this.keyboardState.pressed("2") && track.number == 1)
            track = this.#changeTrack(car, track, scene, 2);

        return track;
    }

    #carIsOnTrack(car, track) {
        for (var i = 0; i < track.blocks.length; i++) {
            if (car.position.x <= track.blocks[i].mesh.position.x + track.blockSize * 1.1 / 2 &&
                car.position.x >= track.blocks[i].mesh.position.x - track.blockSize * 1.1 / 2 &&
                car.position.y <= track.blocks[i].mesh.position.y + track.blockSize * 1.1 / 2 &&
                car.position.y >= track.blocks[i].mesh.position.y - track.blockSize * 1.1 / 2) {
                return true;
            }
        }

        return false;
    }

    #changeTrack(car, track, scene, newTrackNumber) {
        scene.remove(track.group);

        car.mesh.rotation.set(0, 0, degreesToRadians(180));
        car.mesh.position.set(
            track.initialBlockPosition[0],
            track.initialBlockPosition[1],
            1.5
        );
        car.speed = 0;

        return TrackBuilder.buildTrack(scene, newTrackNumber);
    }
}