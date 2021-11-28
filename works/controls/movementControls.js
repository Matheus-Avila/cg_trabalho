

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
            if (car.speed < car.maxSpeed)
                car.speed = car.speed + 0.01;

            if (!carIsOnTrack(car.mesh, track, tempo))
                car.speed = car.speed * 0.5;

            car.mesh.translateX(car.speed);

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
                    car.speed = car.speed * 0.5;

                car.speed = car.speed - 0.01;
                car.mesh.translateX(car.speed);
            }
        }

        if (keyboardState.pressed("down")) {
            if (!carIsOnTrack(car.mesh, track, tempo))
                car.speed = car.speed * 0.5;

            if (car.speed > 0)
                car.speed = .95 * car.speed;
            else {
                car.mesh.translateX(-.08);

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