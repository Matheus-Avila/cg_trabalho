import KeyboardState from '../../libs/util/KeyboardState.js';

export class Keyboard {
    constructor() {
        this.keyboardState = new KeyboardState();
    }

    update = function (car, track) {
        this.keyboardState.update();

        if (this.keyboardState.pressed("left"))
            car.mesh.rotateZ(.05);

        if (this.keyboardState.pressed("right"))
            car.mesh.rotateZ(-.05);

        if (this.keyboardState.pressed("X")) {
            if (car.speed < car.maxSpeed)
                car.speed = car.speed + 0.01;

            if (!this.#onTrack(car.mesh, track))
                car.speed = car.speed * 0.5;

            car.mesh.translateX(car.speed);
        }

        if (!this.keyboardState.pressed("X")) {
            if (car.speed > 0) {
                if (!this.#onTrack(car.mesh, track))
                    car.speed = car.speed * 0.5;

                car.speed = car.speed - 0.01;
                car.mesh.translateX(car.speed);
            }
        }

        if (this.keyboardState.pressed("down")) {
            if (!this.#onTrack(car.mesh, track))
                car.speed = car.speed * 0.5;

            if (car.speed > 0)
                car.speed = .95 * car.speed;
            else
                car.mesh.translateX(-.08);
        }
    }

    #onTrack(car, track) {
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
}