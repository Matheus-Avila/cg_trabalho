import { BlockType } from "../util/constants.js";

var updateMovement = function (keyboardState, car, track, tempo) {
    var accelerationRate = 0.01;
    var angleRate = 0.01;
    var wheelsRotationRate = 0.03;
    var carRotationRate = 0.05;
    var resistanceRate = 0.02;

    if (tempo.numVoltas < 4) {
        if (carIsOnTrack(car.mesh, track, tempo)) {
            car.maxSpeed = 0.6;
        }
        else {
            car.maxSpeed = 0.3;

            if (Math.abs(car.speed) > car.maxSpeed)
                car.speed = car.maxSpeed * Math.sign(car.speed);
        }

        if (keyboardState.pressed("left") && car.angle < car.maxAngleAxle) {
            car.angle += angleRate;
            car.mesh.children[1].rotateZ(wheelsRotationRate);
        }
    
        if (keyboardState.pressed("right") && Math.abs(car.angle) < car.maxAngleAxle) {
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
            car.mesh.translateX(car.speed);

            if (car.angle != 0) {
                car.mesh.rotateZ(carRotationRate * Math.sign(car.speed) * Math.sign(car.angle));
                car.mesh.children[1].rotateZ(-wheelsRotationRate * Math.sign(car.angle));
                car.angle -= Math.min(angleRate, Math.abs(car.angle)) * Math.sign(car.angle);
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

export { updateMovement };