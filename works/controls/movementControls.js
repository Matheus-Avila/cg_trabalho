import * as THREE from '../../build/three.module.js';
import { BlockType } from "../util/constants.js";

var updateMovement = function (keyboardState, car, track, tempo, accelerationOn) {
    var accelerationRate = 0.01;
    var angleRate = 0.01;
    var wheelsRotationRate = 0.03;
    var carRotationRate = 0.05;
    var resistanceRate = 0.02;

    if (tempo.numVoltas < 4) {
        if (!accelerationOn || carIsOnTrack(car.mesh, track, tempo)) {
            if (checkObstaclesCollision(car, track))
                car.maxSpeed = 0.6 * 0.2;
            else
                car.maxSpeed = 0.6;
        }
        else {
            car.maxSpeed = 0.3;
        }

        if (Math.abs(car.speed) > car.maxSpeed)
            car.speed = car.maxSpeed * Math.sign(car.speed);

        if (keyboardState.pressed("left") && car.angle < car.maxAngleAxle) {
            car.angle += angleRate;
            car.mesh.children[1].rotateZ(wheelsRotationRate);
        }
    
        if (keyboardState.pressed("right") && car.angle > -car.maxAngleAxle) {
            car.angle -= angleRate;
            car.mesh.children[1].rotateZ(-wheelsRotationRate);
        }

        if (keyboardState.pressed("X") && car.speed < car.maxSpeed)
            car.speed += accelerationRate;

        if (keyboardState.pressed("down") && Math.abs(car.speed) < car.maxSpeed)
            car.speed -= accelerationRate;

        if (car.speed != 0) {
            if (!keyboardState.pressed("X") && car.speed > 0)
                car.speed -= Math.min(resistanceRate, car.speed);

            if (!keyboardState.pressed("down") && car.speed < 0)
                car.speed += Math.min(resistanceRate, Math.abs(car.speed));
        
            car.spinWheels();

            if (accelerationOn) {
                car.mesh.translateX(car.speed);
    
                if (car.angle != 0) {
                    car.mesh.rotateZ(carRotationRate * Math.sign(car.speed) * Math.sign(car.angle));
                    car.mesh.children[1].rotateZ(-wheelsRotationRate * Math.sign(car.angle));
                    car.angle -= Math.min(angleRate, Math.abs(car.angle)) * Math.sign(car.angle);
                }
            }
        }
    }
}

var carIsOnTrack = function (car, track, tempo) {
    var distanceToBlockSide = track.blockSize * 1.1 / 2;

    for (var i = 0; i < track.blocks.length; i++) {
        var blockPosition = track.blocks[i].mesh.position;

        if (car.position.x <= blockPosition.x + distanceToBlockSide &&
            car.position.x >= blockPosition.x - distanceToBlockSide &&
            car.position.y <= blockPosition.y + distanceToBlockSide &&
            car.position.y >= blockPosition.y - distanceToBlockSide) {
            track.blocks[i].crossed = true;

            if (track.blocks[i].type == BlockType.Initial) {
                tempo.checkLapCompleted(track);
            }

            return true;
        }
    }
    
    return false;
}

var checkObstaclesCollision = function (car, track) {
    return checkObstaclesCollisionHelper(car, track.cones) || checkObstaclesCollisionHelper(car, track.boxes);
}

var checkObstaclesCollisionHelper = function (car, obstacles) {
    for (var i = 0; i < obstacles.length; i++) {
        var obstacle = obstacles[i];

        var obstacleBox3 = new THREE.Box3();
        obstacleBox3.setFromObject(obstacle.mesh);

        var carBox3 = new THREE.Box3();
        carBox3.setFromObject(car.boundingBox);

        if (carBox3.min.x <= obstacleBox3.max.x && carBox3.max.x >= obstacleBox3.min.x &&
            carBox3.min.y <= obstacleBox3.max.y && carBox3.max.y >= obstacleBox3.min.y) {
            return true;
        }
    }

    return false;
}

export { updateMovement };