import KeyboardState from '../util/KeyboardState.js';
import * as THREE from '../../build/three.module.js';
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
        if(this.tempo.numVoltas!=4){
            if (this.keyboardState.pressed("left")){
                // car.mesh.children[1].children[0].rotateZ(.05); Girar rodas
                // car.mesh.children[1].children[1].rotateZ(.05);
                car.mesh.rotateZ(.05);
            }
            if (this.keyboardState.pressed("right")){
                // car.mesh.children[1].children[0].rotateZ(-.05);
                // car.mesh.children[1].children[1].rotateZ(-.05);
                car.mesh.rotateZ(-.05);
            }
            if (this.keyboardState.pressed("X")) {
                if (car.speed < car.maxSpeed)
                    car.speed = car.speed + 0.01;
                
                if (!this.#carIsOnTrack(car.mesh, track))
                    car.speed = car.speed * 0.5;
                var direcao = new THREE.Vector3();
                // car.mesh.children[1].children[0].getWorldDirection(direcao); Sugestao do professor mas nao deu certo
                // car.mesh.translateOnAxis([direcao[1], direcao[0],0], car.speed);
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
    }

    onChangeTrackKeyPressed = function (car, track, scene) {
        if (this.keyboardState.pressed("1") && track.number == 2){
            track = this.#changeTrack(car, track, scene, 1);
            this.tempo.reset();
        }
        else if (this.keyboardState.pressed("2") && track.number == 1){
            track = this.#changeTrack(car, track, scene, 2);
            this.tempo.reset();
        }
            

        return track;
    }

    lastTrue = function(car, track){
        for (var i = 3; i < track.blocks.length; i++) {
            // console.log(i);
            if( track.blocks[i-1].crossed == 'true' && track.blocks[i].crossed == 'false'){
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
                    if(track.blocks[i].crossed == 'checkpoint'){
                        this.lastTrue(car, track);
                    }
                    track.blocks[i].crossed = 'true';
                    if(i>4){
                        track.blocks[3].crossed = 'checkpoint';
                    }
                    if(i == 0){
                        track.blocks[1].crossed = 'true';
                        this.tempo.checkVolta(track);}//Se estiver no bloco inicial então verifica se completou a volta
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