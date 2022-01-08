var updateMovement = function (keyboardState, car) {
    var accelerationRate = 0.01;
    var angleRate = 0.01;
    var rotationRate = 0.03;
    
    if (keyboardState.pressed("X") && car.speed < car.maxSpeed)
        car.speed += accelerationRate;

    if (keyboardState.pressed("down") && Math.abs(car.speed) < car.maxSpeed)
        car.speed -= accelerationRate;

    if (keyboardState.pressed("left") && car.angle < car.maxAngleAxle) {
        car.angle += angleRate;
        car.mesh.children[1].rotateZ(rotationRate);
    }

    if (keyboardState.pressed("right") && car.angle > -car.maxAngleAxle) {
        car.angle -= angleRate;
        car.mesh.children[1].rotateZ(-rotationRate);
    }

    if (car.speed != 0){
        if (!keyboardState.pressed("X") && !keyboardState.pressed("down") && Math.abs(car.speed) <= 0.02)
            car.speed = 0;
        else if (!keyboardState.pressed("X") && car.speed > 0)
            car.speed -= 0.02;
        else if (!keyboardState.pressed("down") && car.speed < 0)
            car.speed += 0.02;

        car.spinWheels();
    }
}

export { updateMovement };