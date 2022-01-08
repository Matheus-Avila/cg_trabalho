export class Car {
    constructor(mesh, maxSpeed, maxAngleAxle) {
        this.mesh = mesh;
        this.speed = 0;
        this.angle = 0;
        this.maxAngleAxle = maxAngleAxle;
        this.maxSpeed = maxSpeed;
    }

    spinWheels() {
        this.mesh.children[0].children[0].rotateY(this.speed);
        this.mesh.children[0].children[1].rotateY(this.speed);
        this.mesh.children[1].children[0].rotateY(this.speed);
        this.mesh.children[1].children[1].rotateY(this.speed);
    }
}