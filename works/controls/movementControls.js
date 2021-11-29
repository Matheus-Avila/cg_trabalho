import { BlockType } from "../util/enums.js";

var updateMovement = function (keyboardState, car, track, tempo) {
    if (tempo.numVoltas < 4) {
        if (keyboardState.pressed("left") && car.angle < car.maxAngleAxle) {
            car.angle = car.angle + 0.01;
            car.mesh.children[1].children[0].rotateZ(.03);
            car.mesh.children[1].children[1].rotateZ(.03);
        }

        if (keyboardState.pressed("right") && car.angle > -car.maxAngleAxle) {
            car.angle = car.angle - 0.01;
            car.mesh.children[1].children[0].rotateZ(-.03);
            car.mesh.children[1].children[1].rotateZ(-.03);
        }

        if (keyboardState.pressed("X")) {
            if (car.speed < car.maxSpeed && car.speed >= 0)
                car.speed = car.speed + 0.01;
            else if (car.speed > 0) car.speed -= 0.02;

            if (!carIsOnTrack(car.mesh, track, tempo))
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

        if (!keyboardState.pressed("X")) {
            if (car.speed > 0) {
                if (!carIsOnTrack(car.mesh, track, tempo))
                    car.maxSpeed = 0.15;
                else car.maxSpeed = 0.3;

                car.speed = car.speed - 0.01;
                if (car.speed < 0) car.speed = 0;
                car.mesh.translateX(car.speed);
            }
        }

        if (!keyboardState.pressed("down")) {
            if (car.speed < 0) {
                if (!carIsOnTrack(car.mesh, track, tempo))
                    car.maxSpeed = 0.15;
                else car.maxSpeed = 0.3;

                car.speed = car.speed + 0.01;
                if (car.speed > 0) car.speed = 0;
                car.mesh.translateX(car.speed);
            }
        }

        if (keyboardState.pressed("down")) {
            if (car.speed > -car.maxSpeed && car.speed <= 0) { car.speed -= 0.01; }
            else if (car.speed < 0) car.speed += 0.02;

            if (!carIsOnTrack(car.mesh, track, tempo)) {
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

        if (car.speed > 0) {
            spinWheels(car, 1);
        }
        else if (car.speed < 0) {
            spinWheels(car, -1);
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

var spinWheels = function (car, direction) {
    var spinSpeed = car.speed * direction;

    car.mesh.children[0].children[0].rotateY(spinSpeed);
    car.mesh.children[0].children[1].rotateY(spinSpeed);
    car.mesh.children[1].children[0].rotateY(spinSpeed);
    car.mesh.children[1].children[1].rotateY(spinSpeed);
}

export { updateMovement };