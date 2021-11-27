export class Car {
    constructor(mesh, maxSpeed, maxAngleAxle) {
        this.mesh = mesh;
        this.speed = 0;
        this.angle = 0;
        this.maxAngleAxle = maxAngleAxle;
        this.maxSpeed = maxSpeed;
    }
}