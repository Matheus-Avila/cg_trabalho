import { Car } from "../classes/car.js";
import * as THREE from '../../build/three.module.js';
import { degreesToRadians } from '../../libs/util/util.js';

var buildCar = function (scene, maxSpeed) {
    var maxSpeed = 0.3;
    var maxAngleAxle = 0.3;
    var casing = buildCasing();
    var axle = buildAxle(casing);
    buildWheels(axle.front, axle.back);
    scene.add(casing);

    return new Car(casing, maxSpeed, maxAngleAxle);
}

var buildCasing = function () {
    var casingGeometry = new THREE.CylinderGeometry(1.0, 1.3, 2.5, 40, 40, false, 1);
    casingGeometry.rotateZ(degreesToRadians(270));
    var casingMaterial = new THREE.MeshPhongMaterial({ color: "rgba(128, 0, 0)" });
    var casing = new THREE.Mesh(casingGeometry, casingMaterial);
    casing.position.set(0.0, 0.0, .63);
    casing.scale.set(0.4, 0.4, 0.4);
    casing.rotation.set(0, 0, degreesToRadians(180));

    return casing;
}

var buildAxle = function (car) {
    var axleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2.3, 32);
    var axleMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });

    var front = new THREE.Mesh(axleGeometry, axleMaterial);
    front.position.x = front.position.x - 1;
    front.position.z = front.position.z - 1;
    car.add(front);

    var back = new THREE.Mesh(axleGeometry, axleMaterial);
    back.position.x = back.position.x + 1;
    back.position.z = back.position.z - 1;
    car.add(back);

    return { front, back };
}

var buildWheels = function (frontAxle, backAxle) {
    var wheelGeometry = new THREE.TorusGeometry(0.28, 0.3, 10, 10, Math.PI * 2);
    wheelGeometry.rotateX(degreesToRadians(270));
    var wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

    var rightFrontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rightFrontWheel.position.y = rightFrontWheel.position.y - 1.1;
    frontAxle.add(rightFrontWheel);

    var leftFrontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    leftFrontWheel.position.y = leftFrontWheel.position.y + 1.1;
    frontAxle.add(leftFrontWheel);

    var rightRearWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rightRearWheel.position.y = rightRearWheel.position.y - 1.1;
    backAxle.add(rightRearWheel);

    var leftRearWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    leftRearWheel.position.y = leftRearWheel.position.y + 1.1;
    backAxle.add(leftRearWheel);
}

export { buildCar };