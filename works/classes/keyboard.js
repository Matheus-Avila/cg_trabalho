import KeyboardState from '../util/KeyboardState.js';
import * as TrackBuilder from '../builders/trackBuilder.js';
import { degreesToRadians } from '../../libs/util/util.js';
import { timeCheck } from '../util/timeController.js';

export class Keyboard {
    constructor() {
        this.keyboardState = new KeyboardState();
        this.tempo = new timeCheck(this);
    }

    update = function () {
        this.keyboardState.update();
    }
    onMovementKeyPressed = function (car, track) {
        if (this.tempo.numVoltas != 4) {
            if (this.keyboardState.pressed("left")) {
                if (car.angle < car.maxAngleAxle) {
                    car.angle = car.angle + 0.01;
                    car.mesh.children[1].children[0].rotateZ(.03);
                    car.mesh.children[1].children[1].rotateZ(.03);
                }
            }
            if (this.keyboardState.pressed("right")) {
                if (car.angle > -car.maxAngleAxle) {
                    car.angle = car.angle - 0.01;
                    car.mesh.children[1].children[0].rotateZ(-.03);
                    car.mesh.children[1].children[1].rotateZ(-.03);
                }
            }

            if (this.keyboardState.pressed("X")) {
                if (car.speed < car.maxSpeed && car.speed >= 0)
                    car.speed = car.speed + 0.01;
                else  if (car.speed > 0) car.speed -= 0.02;

                if (!this.#carIsOnTrack(car.mesh, track))
                    car.maxSpeed = 0.15;
                else car.maxSpeed = 0.3;

                if (car.speed > 0) car.mesh.translateX(car.speed);

                if (car.angle > 0) {
                    car.mesh.rotateZ(.05);
                    car.mesh.children[1].children[0].rotateZ(-.03);
                    car.mesh.children[1].children[1].rotateZ(-.03);
                    car.angle = car.angle - 0.01;
                }
                if (car.angle < 0) {
                    car.mesh.rotateZ(-.05);
                    car.mesh.children[1].children[0].rotateZ(.03);
                    car.mesh.children[1].children[1].rotateZ(.03);
                    car.angle = car.angle + 0.01;
                }
            }

            if (!this.keyboardState.pressed("X")) {
                if (car.speed > 0) {
                    if (!this.#carIsOnTrack(car.mesh, track))
                        car.maxSpeed = 0.15;
                    else car.maxSpeed = 0.3;

                    car.speed = car.speed - 0.01;
                    if (car.speed < 0) car.speed = 0;
                    car.mesh.translateX(car.speed);

                }
            }

            if (!this.keyboardState.pressed("down")) {
                if (car.speed < 0) {
                    if (!this.#carIsOnTrack(car.mesh, track))
                        car.maxSpeed = 0.15;
                    else car.maxSpeed = 0.3;

                    car.speed = car.speed + 0.01;
                    if (car.speed > 0) car.speed = 0;
                    car.mesh.translateX(car.speed);

                }
            }

            if (this.keyboardState.pressed("down")) {
                if (car.speed > -car.maxSpeed && car.speed <=0) { car.speed -= 0.01; }
                else if (car.speed < 0) car.speed += 0.02;
                if (!this.#carIsOnTrack(car.mesh, track)) {
                    car.maxSpeed = 0.15;
                }
                else {
                    car.maxSpeed = 0.3;
                }

                
                if (car.speed < 0) car.mesh.translateX(car.speed);
                if (car.angle > 0) {
                    car.mesh.rotateZ(-.05);
                    car.mesh.children[1].children[0].rotateZ(-.03);
                    car.mesh.children[1].children[1].rotateZ(-.03);
                    car.angle = car.angle - 0.01;
                }
                if (car.angle < 0) {
                    car.mesh.rotateZ(.05);
                    car.mesh.children[1].children[0].rotateZ(.03);
                    car.mesh.children[1].children[1].rotateZ(.03);
                    car.angle = car.angle + 0.01;
                }
            }
        }
        console.log(car.maxSpeed);
    }

    onChangeTrackKeyPressed = function (car, track, scene) {
        if (this.keyboardState.pressed("1") && track.number == 2) {
            track = this.#changeTrack(car, track, scene, 1);
            this.tempo.reset();
        }
        else if (this.keyboardState.pressed("2") && track.number == 1) {
            track = this.#changeTrack(car, track, scene, 2);
            this.tempo.reset();
        }


        return track;
    }

    lastTrue = function (car, track) {
        for (var i = 3; i < track.blocks.length; i++) {
            // console.log(i);
            if (track.blocks[i - 1].crossed == true && track.blocks[i].crossed == false) {
                car.position.x = track.blocks[i].mesh.position.x;
                car.position.y = track.blocks[i].mesh.position.y;
                break;
            }
        }
    }

    #carIsOnTrack(car, track) {
        for (var i = 0; i < track.blocks.length; i++) {
            if (car.position.x <= track.blocks[i].mesh.position.x + track.blockSize * 1.1 / 2 &&
                car.position.x >= track.blocks[i].mesh.position.x - track.blockSize * 1.1 / 2 &&
                car.position.y <= track.blocks[i].mesh.position.y + track.blockSize * 1.1 / 2 &&
                car.position.y >= track.blocks[i].mesh.position.y - track.blockSize * 1.1 / 2) {
                track.blocks[i].crossed = true;
                if (i == 0) {
                    this.tempo.checkVolta(track);
                }//Se estiver no bloco inicial então verifica se completou a volta

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