

var updateMovement = function (keyboardState, car, track, tempo) {
    if (tempo.numVoltas < 4) {
        var acceleration = 0.01;

        if (keyboardState.pressed("X") && car.speed < car.maxSpeed)
            car.speed += acceleration;

        if (keyboardState.pressed("down") && car.speed > car.maxSpeed * (-1)) {
            car.speed -= acceleration;
        }

        if (!keyboardState.pressed("X") && !keyboardState.pressed("down")) {
            if (acceleration > Math.abs(car.speed))
                acceleration = car.speed;

            if (car.speed > 0)
                car.speed -= acceleration;
            else if (car.speed < 0)
                car.speed += acceleration;
        }

        if (car.speed != 0) {
            if (keyboardState.pressed("left"))
                car.mesh.rotateZ(.05);

            if (keyboardState.pressed("right"))
                car.mesh.rotateZ(-.05);

            if (!carIsOnTrack(car.mesh, track, tempo))
                car.speed *= 0.5;

            car.mesh.translateX(car.speed);
        }
    }
}

var carIsOnTrack = function (car, track, tempo) {
    for (var i = 0; i < track.blocks.length; i++) {
        if (car.position.x <= track.blocks[i].mesh.position.x + track.blockSize * 1.1 / 2 &&
            car.position.x >= track.blocks[i].mesh.position.x - track.blockSize * 1.1 / 2 &&
            car.position.y <= track.blocks[i].mesh.position.y + track.blockSize * 1.1 / 2 &&
            car.position.y >= track.blocks[i].mesh.position.y - track.blockSize * 1.1 / 2) {
            if (track.blocks[i].crossed == 'checkpoint') {
                lastTrue(car, track);
            }
            track.blocks[i].crossed = 'true';
            if (i > 4) {
                track.blocks[3].crossed = 'checkpoint';
            }
            if (i == 0) {
                track.blocks[1].crossed = 'true';
                tempo.checkVolta(track); //Se estiver no bloco inicial então verifica se completou a volta
            }

            return true;
        }
    }

    return false;
}

var lastTrue = function (car, track) {
    for (var i = 3; i < track.blocks.length; i++) {
        if (track.blocks[i - 1].crossed == 'true' && track.blocks[i].crossed == 'false') {
            car.position.x = track.blocks[i].mesh.position.x;
            car.position.y = track.blocks[i].mesh.position.y;
            break;
        }
    }
}

export { updateMovement };